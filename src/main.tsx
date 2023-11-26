import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { createStore } from './utils/myRedux/myRedux.ts'
import { Provider } from './utils/myReactRedux'

import './index.css'

export type ROUTES = 'HOME' | 'LOGIN' | 'MAIN';

export type RootStateT = {
  route: ROUTES,
  authData: {
    tokenExpiredAt: string,
  }
}

const initialState: RootStateT = {
  route: 'HOME',
  authData: {
    tokenExpiredAt: '',
  }
}

export const actions = {
  SET_AUTH_DATA: 'SET_AUTH_DATA',
  REMOVE_AUTH_DATA: 'REMOVE_AUTH_DATA',
  REDIRECT_PAGE: 'REDIRECT_PAGE',
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.SET_AUTH_DATA:
      return {
        ...state,
        authData: {
          tokenExpiredAt: action.payload,
        },
      }
    case actions.REMOVE_AUTH_DATA:
      return {
        ...state,
        authData: {
          tokenExpiredAt: '',
        },
      }
    case actions.REDIRECT_PAGE:
      return {
        ...state,
        route: action.payload,
      }
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
