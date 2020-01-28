import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import './style/layout.css';
import Header from './header';

import { AppStateProvider, useAppContext } from '../store/state-provider';
import { openModal } from './modals';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [authState] = useAppContext();

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.45rem',
          }}
        >
          {children}
        </main>
        <hr />
        <footer style={{ textAlign: 'center' }}>
          Landmarks App © {new Date().getFullYear()}
        </footer>
        {openModal(authState.openModal)}
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ({ children }) => {
  return (
    <AppStateProvider
      initialState={{
        refresh: localStorage.getItem('refresh-token'),
        openModal: null,
      }}
    >
      <Layout>{children}</Layout>
    </AppStateProvider>
  );
};
