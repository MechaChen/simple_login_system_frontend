// @ts-nocheck
const createStore = (reducer) => {
  let currentState = reducer(undefined, {});
  let subscribers = [];

  const dispatch = (action) => {
    currentState = reducer(currentState, action);
    subscribers.forEach((subscriber) => subscriber());
  };

  const getState = () => (
    currentState
  );

  const subscribe = (newSubscriber) => {
    subscribers.push(newSubscriber);

    const unsubscribe = () => {
      subscribers = subscribers.filter((subscriber) => (
        subscriber !== newSubscriber
      ))
    }

    return unsubscribe;
  };

  return {
    dispatch,
    getState,
    subscribe,
  };
}

export { createStore };