import L from 'leaflet';

const baseUrl =
  'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/';
const shadowUrl =
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png';

export const greenIcon = new L.Icon({
  iconUrl: `${baseUrl}marker-icon-green.png`,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const redIcon = new L.Icon({
  iconUrl: `${baseUrl}marker-icon-red.png`,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const blueIcon = new L.Icon({
  iconUrl: `${baseUrl}marker-icon-blue.png`,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
