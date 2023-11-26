import React from 'react';

import LoginPage from '../../pages/login';
import HomePage from '../../pages/home';
import MainPage from '../../pages/main';
import type { RootStateT, ROUTES } from '../../main';
import { useSelector } from '../../utils/myReactRedux';

import './Right.css';

type RouteMapT = {
  [route in ROUTES]: React.ReactNode;
}

const routeMap: RouteMapT = {
  'HOME': <HomePage />,
  'LOGIN': <LoginPage />,
  'MAIN': <MainPage />
};

const Right = function Right() {
  const curRoute: ROUTES = useSelector((state: RootStateT) => state.route);

  return (
    <div className="Right">
      {routeMap[curRoute]}
    </div>
  );
}

export default Right;
