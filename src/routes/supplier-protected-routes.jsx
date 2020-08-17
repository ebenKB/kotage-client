import React, { lazy } from 'react';

const SupplierHome = lazy(() => import('../components/supplier/supplier-rfx/supplier'));
const SupplierDashboard = lazy(() => import('../components/supplier/supplier-rfx-dashboard/supplier-rfx-dashboard'));
const BidResponse = lazy(() => import('../components/supplier/supplier-bid-response/supplier-bid-response'));
const SupplierMessageCenter = lazy(() => import('../pages/supplier/message-center/message-center'));
const NewMessage = lazy(() => import('../pages/supplier/new-message/new-supplier-message'));
const TermsConditions = lazy(() => import('../pages/supplier/rfp-tems-conditions'));
const SupplierNotifications = lazy(() => import('../components/supplier/supplier-notification/supplier-notification'));
const PreviewSupplierMessage = lazy(() => import('../pages/supplier/message-preview/message-preview'));
const Bids = lazy(() => import('../components/supplier/bids/bids'));
const ShowBid = lazy(() => import('../components/supplier/show-bid/show-bid'));
const ReviseBid = lazy(() => import('../components/supplier/revise-bid/revise-bid'));

const routes = [
  {
    path: '/supplier/rfx',
    exact: true,
    main: () => <SupplierHome />,
  },
  {
    path: '/supplier/rfp/dashboard/:id/:tenant_id',
    exact: true,
    main: () => <SupplierDashboard />,
  },
  {
    path: '/supplier/rfp/:id/response',
    exact: true,
    main: () => <BidResponse />,
  },
  {
    path: '/supplier/rfp/:id/terms-and-conditions',
    exact: true,
    main: () => <TermsConditions />,
  },
  {
    path: '/supplier/rfp/dashboard/:id/:tenant_id/message',
    exact: true,
    main: () => <SupplierMessageCenter />,
  },
  {
    path: '/supplier/rfp/dashboard/:id/:tenant_id/message/new',
    exact: true,
    main: () => <NewMessage />,
  },
  {
    path: '/supplier/notifications',
    exact: true,
    main: () => <SupplierNotifications />,
  },
  {
    path: '/supplier/bids',
    exact: true,
    main: () => <Bids />,
  },
  {
    path: '/supplier/bids/:id',
    exact: true,
    main: () => <ShowBid />,
  },
  {
    path: '/supplier/bids/:id/revise',
    exact: true,
    main: () => <ReviseBid />,
  },
  {
    exact: true,
    path: '/supplier/rfp/dashboard/:id/:tenant_id/message/:message_id/view',
    main: () => <PreviewSupplierMessage />,
  },
];

export default routes;
