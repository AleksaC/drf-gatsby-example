export const formatLandmarkData = (landmark) => {
  return {
    ...landmark,
    coords: landmark.coords
      .substring(landmark.coords.indexOf('(') + 1, landmark.coords.indexOf(')'))
      .split(' ')
      .reverse()
      .map((coord) => parseFloat(coord)),
  };
};
