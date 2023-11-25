// @ts-nocheck

import ReduxContext from "./_ReduxContext";

const Provider = ({ store, children }) => {
  return (
    <ReduxContext.Provider value={store}>
      {children}
    </ReduxContext.Provider>
  );
}

export default Provider;
