import React, { lazy } from 'react';

const SupplierHome = lazy(() => import('../components/supplier/supplier-rfx/supplier'));
const SupplierDashboard = lazy(() => import('../components/supplier/supplier-rfx-dashboard/supplier-rfx-dashboard'));
const BidResponse = lazy(() => import('../components/supplier/supplier-bid-response/supplier-bid-response'));
const MessageCenter = lazy(() => import('../components/message-center/message-center'));
const NewMessage = lazy(() => import('../components/message-center/new-message/new-message'));

const routes = [
  {
    path: '/supplier/rfx',
    exact: true,
    main: () => <SupplierHome />,
  },
  {
    path: '/supplier/rfp/dashboard/:id',
    exact: true,
    main: () => <SupplierDashboard />,
  },
  {
    path: '/supplier/rfx/:id/response',
    exact: true,
    main: () => <BidResponse />,
  },
  {
    path: '/supplier/rfx/:id/message',
    exact: true,
    main: () => <MessageCenter />,
  },
  {
    path: '/supplier/rfx/:id/message/create/new',
    exact: true,
    main: () => <NewMessage />,
  },
];

export default routes;
