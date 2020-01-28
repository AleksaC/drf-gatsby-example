import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';
import { LoginModal, RegistrationModal } from './modals';

import { useAppContext } from '../store/state-provider';
import { useIsAuthenticated } from '../services/auth-service';

const Header = ({ siteTitle }) => {
  const isAuthenticated = useIsAuthenticated();
  const [appState, setAppState] = useAppContext();

  const showModal = (event, modal) => {
    event.preventDefault();
    setAppState({
      ...appState,
      openModal: modal,
    });
  };

  const logOut = (event) => {
    event.preventDefault();
    setAppState({});
    localStorage.removeItem('refresh-token');
  };

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div
          style={{
            display: 'flex',
            width: '160px',
            justifyContent: 'space-between',
            color: 'white',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, Segoe UI,  sans-serif',
            fontSize: '1.2em',
            fontWeight: '500',
          }}
        >
          {isAuthenticated ? (
            <a href="/" onClick={(e) => logOut(e)}>
              Log Out
            </a>
          ) : (
            <>
              <a href="/" onClick={(e) => showModal(e, <RegistrationModal />)}>
                Register
              </a>
              <a href="/" onClick={(e) => showModal(e, <LoginModal />)}>
                Log in
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
