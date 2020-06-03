import React, { lazy } from 'react';

const SupplierHome = lazy(() => import('../components/supplier/supplier-events/supplier'));
const SupplierDashboard = lazy(() => import('../components/supplier/supplier-rfx-dashboard/supplier-rfx-dashboard'));
const BidResponse = lazy(() => import('../components/supplier/supplier-bid-response/supplier-bid-response'));

const routes = [
  {
    path: '/supplier/events',
    exact: true,
    main: () => <SupplierHome />,
  },
  {
    path: '/supplier/events/dashboard/:id',
    exact: true,
    main: () => <SupplierDashboard />,
  },
  {
    path: '/supplier/events/:id/response',
    exact: true,
    main: () => <BidResponse />,
  },
];

export default routes;
