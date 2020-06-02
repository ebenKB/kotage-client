import React, { lazy } from 'react';

const SupplierHome = lazy(() => import('../components/supplier/supplier-events/supplier'));
const SupplierDashboard = lazy(() => import('../components/supplier/supplier-rfx-dashboard/supplier-rfx-dashboard'));


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
];

export default routes;
