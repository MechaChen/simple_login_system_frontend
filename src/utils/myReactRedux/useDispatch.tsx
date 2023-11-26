// @ts-nocheck

import { useReduxContext } from "./_ReduxContext";

const useDispatch = () => {
  const { dispatch } = useReduxContext();

  return dispatch;
};

export default useDispatch;
