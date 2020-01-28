import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Map from '../components/map';
import useLocation from '../hooks/useLocation';

const IndexPage = () => {
  const location = useLocation();

  const { latitude = 42.4357859, longitude = 19.266418 } =
    location && location.coords ? location.coords : {};

  return (
    <Layout>
      <SEO title="Home" />
      <Map
        options={{ center: [latitude, longitude], zoom: 15 }}
        currentLocation={location}
      />
    </Layout>
  );
};

export default IndexPage;
