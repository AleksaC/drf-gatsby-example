import React from 'react';
import ReactDOM from 'react-dom';

import closeBtn from '../images/close-icon.png';

import { API } from '../config/api';
import { useAppContext } from '../store/state-provider';

export const openModal = (modal) => {
  let container = document.querySelector('#modal-root');

  if (!container) {
    container = document.createElement('div');
    container.id = 'modal-root';
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(modal, container);
};

const Modal = ({ title, children }) => {
  const [authState, setAuthState] = useAppContext();

  const closeModal = (event) => {
    event.preventDefault();
    setAuthState({ ...authState, openModal: null });
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <h1>{title}</h1>
          <a href="/" onClick={closeModal}>
            <img
              className="close-btn"
              src={closeBtn}
              alt=""
              height={16}
              width={16}
            />
          </a>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export const RegistrationModal = () => {
  const [appState, setAppState] = useAppContext();

  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API.BASE}${API.REGISTRATION.ROOT}`, {
        method: 'POST',
        body: new FormData(e.target),
      });

      if (response.status >= 400) {
        const errorMessages = await response.json();
        for (const errorMessage in errorMessages) {
          if (errorMessages.hasOwnProperty(errorMessage)) {
            alert(errorMessages[errorMessage]);
          }
        }
      } else {
        alert('Registration successful');
        setAppState({ ...appState, openModal: null });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal title={'Register'}>
      <form className="registration-form" onSubmit={register}>
        <label htmlFor="username">
          Username
          <input id="username" type="text" name="username" required={true} />
        </label>
        <label htmlFor="email">
          e-mail
          <input id="email" type="email" name="email" required={true} />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            required={true}
          />
        </label>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <input type="submit" />
        </div>
      </form>
    </Modal>
  );
};

export const LoginModal = () => {
  const [appState, setAppState] = useAppContext();

  const logIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API.BASE}${API.AUTHENTICATION.LOGIN}`, {
        method: 'POST',
        body: new FormData(e.target),
      });
      if (response.status >= 400) {
        const errorMessages = await response.json();
        for (const errorMessage in errorMessages) {
          if (errorMessages.hasOwnProperty(errorMessage)) {
            alert(errorMessages[errorMessage]);
          }
        }
      } else {
        const { refresh, access } = await response.json();
        setAppState({ ...appState, refresh, access, openModal: null });
        localStorage.setItem('refresh-token', refresh);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal title="Login">
      <form className="login-form" onSubmit={logIn}>
        <label htmlFor="username">
          Username
          <input id="username" type="text" name="username" required={true} />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            required={true}
          />
        </label>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <input type="submit" />
        </div>
      </form>
    </Modal>
  );
};
