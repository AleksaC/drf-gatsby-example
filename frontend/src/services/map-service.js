import { API } from '../config/api';
import { useRefresh } from './auth-service';
import { useAppContext } from '../store/state-provider';
import { formatLandmarkData } from '../helpers/formatters';
import { useEffect, useState } from 'react';

const { BASE, LANDMARKS } = API;

export const useLandmarks = (route, execute = true) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLandmarks = async () => {
      if (!execute) return;

      try {
        setLoading(true);
        const response = await fetch(`${BASE}${route}`);
        const responseData = await response.json();
        setData(responseData.map(formatLandmarkData));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLandmarks();
  }, [route, execute]);

  return { data, loading };
};

export const useAllLandmarks = () => {
  return useLandmarks(LANDMARKS.ROOT);
};

export const useNearbyLandmarks = (currentLocation) => {
  const { latitude, longitude } =
    currentLocation && currentLocation.coords ? currentLocation.coords : {};

  return useLandmarks(
    `${LANDMARKS.NEARBY}?latitude=${latitude}&longitude=${longitude}`,
    latitude !== undefined
  );
};

export const useFavoriteLandmarks = () => {
  const [appState] = useAppContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${appState.access}`,
    },
  };

  useRefresh(options);

  useEffect(() => {
    const fetchLandmarks = async () => {
      if (!appState.access) return;

      try {
        setLoading(true);
        const response = await fetch(`${BASE}${LANDMARKS.FAVORITE}`, options);
        const responseData = await response.json();
        setData(responseData.map(formatLandmarkData));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLandmarks();
  }, [appState.access]);

  return { data, loading };
};

export const useAddFavoriteLandmark = () => {
  const [appState] = useAppContext();

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${appState.access}`,
      'Content-Type': 'application/json',
    },
  };

  useRefresh(options);

  return async (landmarkId) => {
    if (!appState.access) return;

    options.body = JSON.stringify({ id: landmarkId });

    try {
      const response = await fetch(`${BASE}${LANDMARKS.FAVORITE}`, options);
      if (response.status !== 201) {
        alert("Couldn't add landmark.");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const useRemoveFavoriteLandmark = () => {
  const [appState] = useAppContext();

  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${appState.access}`,
    },
  };

  useRefresh(options);

  return async (landmarkId) => {
    if (!appState.access) return;

    try {
      const response = await fetch(
        `${BASE}${LANDMARKS.FAVORITE}${landmarkId}/`,
        options
      );
      if (response.status !== 204) {
        alert("Landmark couldn't be removed.");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
