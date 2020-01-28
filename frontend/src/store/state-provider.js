import React, { useContext, useState } from 'react';

const AppContext = React.createContext({});
export const useAppContext = () => useContext(AppContext);

// TODO: replace useState with useReducer
export const AppStateProvider = ({ initialState, children }) => {
  return (
    <AppContext.Provider value={useState(initialState)}>
      {children}
    </AppContext.Provider>
  );
};
