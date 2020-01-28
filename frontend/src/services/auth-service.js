import { API } from '../config/api';
import { useEffect } from 'react';
import { useAppContext } from '../store/state-provider';

const { BASE, AUTHENTICATION } = API;

export const useIsAuthenticated = () => {
  const [authState] = useAppContext();
  return authState.refresh;
};

export const useRefresh = (options) => {
  const [appState, setAppState] = useAppContext();

  useEffect(() => {
    const refresh = async () => {
      if (!appState.refresh) return;

      if (
        options &&
        options.headers &&
        options.headers.Authorization &&
        tokenExpired(appState.access)
      ) {
        try {
          const formData = new FormData();

          formData.append('refresh', appState.refresh);

          const response = await fetch(`${BASE}${AUTHENTICATION.REFRESH}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${appState.refresh}`,
            },
            body: formData,
          });

          const accessToken = await response.json();
          setAppState((authState) => ({ ...authState, ...accessToken }));
        } catch (e) {
          console.log(e);
        }
      }
    };
    refresh();
  }, [appState.refresh]);
};

export const tokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return new Date().getTime() + 10000 > payload.exp * 1000;
  } catch (e) {
    return true;
  }
};
