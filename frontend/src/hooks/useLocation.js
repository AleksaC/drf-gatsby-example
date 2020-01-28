import { useEffect, useState } from 'react';

export default () => {
  const [location, setLocation] = useState({});

  useEffect(
    () =>
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
        },
        (error) => {
          setLocation(null);
          console.log(error);
        },
        { enableHighAccuracy: true }
      ),
    []
  );

  return location;
};
