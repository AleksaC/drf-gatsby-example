import React, { useEffect, useState } from 'react';

import Filter from "./filter";
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import { blueIcon, greenIcon, redIcon } from './marker-icons';

import {
  useAddFavoriteLandmark,
  useAllLandmarks,
  useFavoriteLandmarks,
  useNearbyLandmarks,
  useRemoveFavoriteLandmark,
} from '../services/map-service';
import { useIsAuthenticated } from '../services/auth-service';

const Map = ({ options, currentLocation }) => {
  const isAuthenticated = useIsAuthenticated();
  const [activeFilter, setActiveFilter] = useState('nearby');

  const addToFavorites = useAddFavoriteLandmark();
  const removeFromFavorites = useRemoveFavoriteLandmark();

  const { data: all } = useAllLandmarks();
  const { data: nearby } = useNearbyLandmarks(currentLocation);
  const { data: favorite } = useFavoriteLandmarks();

  const [data, setData] = useState({
    all: all.slice(),
    nearby: nearby.slice(),
    favorite: favorite.slice(),
  });

  useEffect(() => {
    setData({ all, nearby, favorite });
  }, [all, nearby, favorite]);

  useEffect(() => {
    if (!isAuthenticated && activeFilter === 'favorite') {
      setActiveFilter('nearby');
    }
  }, [isAuthenticated]);

  return (
    <div style={{ width: '750px', height: '660px' }}>
      {typeof window !== undefined && (
        <LeafletMap style={{ width: '750px', height: '600px' }} {...options}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {currentLocation && (
            <Marker position={options.center} icon={greenIcon}>
              <Popup>Current-ish location.</Popup>
            </Marker>
          )}
          {data[activeFilter].map((marker) => {
            let isFavorite = false;

            if (isAuthenticated) {
              if (activeFilter === 'favorite') {
                isFavorite = true;
              }

              for (const fav of data.favorite) {
                if (marker.id === fav.id) {
                  isFavorite = true;
                  break;
                }
              }
            }

            return (
              <div key={marker.id}>
                <Marker
                  position={marker.coords}
                  icon={isFavorite ? redIcon : blueIcon}
                >
                  <Popup>
                    <a
                      href={marker.details}
                      style={{
                        display: 'block',
                        textAlign: 'center',
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {marker.name}
                    </a>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        style={{ marginBottom: '0' }}
                        src={marker.thumbnail}
                        alt=""
                        width={138}
                      />
                      {isAuthenticated &&
                        (isFavorite ? (
                          <button
                            onClick={() => {
                              removeFromFavorites(marker.id);
                              setData({
                                ...data,
                                favorite: favorite.filter(
                                  (landmark) => landmark.id !== marker.id
                                ),
                              });
                            }}
                          >
                            Remove from favorites
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              addToFavorites(marker.id);
                              setData({
                                ...data,
                                favorite: [...data.favorite, marker],
                              });
                            }}
                          >
                            Add to favorites
                          </button>
                        ))}
                    </div>
                  </Popup>
                </Marker>
              </div>
            );
          })}
        </LeafletMap>
      )}
      <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
    </div>
  );
};

export default Map;
