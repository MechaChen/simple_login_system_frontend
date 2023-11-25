// @ts-nocheck

import { useReduxContext } from "./_ReduxContext";

const useDispatch = () => {
  const { store } = useReduxContext();

  return store.dispatch;
};

export default useDispatch;
