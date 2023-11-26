import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { createStore } from './utils/myRedux/myRedux.ts'
import { Provider } from './utils/myReactRedux'

import './index.css'

const initialState = {
  tokenData: {
    expiredAt: '',
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GEN_AUTH':
      return {
        ...state,
        tokenData: {
          expiredAt: action.payload,
        },
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
