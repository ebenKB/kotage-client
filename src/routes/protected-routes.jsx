import React, { lazy } from 'react';

const Home = lazy(() => import('../pages/home'));

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />,
  },
];

export default routes;
