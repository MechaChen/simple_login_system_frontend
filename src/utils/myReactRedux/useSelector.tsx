// @ts-nocheck

import { useRef, useEffect, useReducer } from 'react';

import { useReduxContext } from './_ReduxContext';

const trivialInitialNumberState = 0;

const alwaysUpdatedReducer = (state, action) => {
  return state + 1;
  // switch(action.type) {
  //   default:
  //     return state + 1;
  // }
}

const defaultEqualityFn = (prevState, newState) => {
  return prevState === newState;
}

const useSelector = (
  selector,
  equalityFn = defaultEqualityFn,
) => {
  // 1. a reducer to trigger re-render
  // 2. a Ref to store prevState
  // 3. a useEffect to register to redux store
  // 4. a function to check whether prevSeletedState & newSelectedState is equal
  // 5. 
  const [, forceUpdate] = useReducer(
    alwaysUpdatedReducer,
    trivialInitialNumberState,
  );

  const { getState, subscribe } = useReduxContext();

  const prevSelectedState = useRef(null);

  const updateIfChange = () => {
    const newSelectedState = selector(getState());

    if (equalityFn(prevSelectedState, newSelectedState)) {
      return;
    }

    prevSelectedState.current = newSelectedState;
    forceUpdate();
  };

  useEffect(() => {
    const unsubscribe = subscribe(updateIfChange);

    return () => {
      unsubscribe();
    }
  }, []);

  return selector(getState());
};

export default useSelector;
