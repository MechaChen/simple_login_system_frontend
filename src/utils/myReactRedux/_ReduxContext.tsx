// @ts-nocheck

import { createContext, useContext } from "react";

const ReduxContext = createContext(null);

const useReduxContext = () => {
  const contextValue = useContext(ReduxContext);

  if (!contextValue) {
    throw new Error('could not find react-redux context value; please ensure the component is wrapped in a <Provider>');
  }

  return contextValue;
};

export { 
  ReduxContext as default,
  useReduxContext,
};