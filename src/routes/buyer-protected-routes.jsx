import React, { lazy } from 'react';
import UserInvitation from '../components/forms/user-invitation/new-invitation/user-invitation';

// const Home = lazy(() => import('../pages/home'));
const NewRequisition = lazy(() => import('../components/forms/requisitions/new/new-requisitions'));
const Requisitions = lazy(() => import('../components/forms/requisitions/show/requisitions-index'));
const Newquote = lazy(() => import('../components/forms/quotes/new/new-quote'));
const RFX = lazy(() => import('../components/rfx/show/rfx'));
const Vendors = lazy(() => import('../components/forms/vendors/vendors'));
const Users = lazy(() => import('../components/forms/user/show-users/show-users'));
const NewProposal = lazy(() => import('../components/forms/rfp/rfp'));
const EditProposal = lazy(() => import('../components/forms/rfp/edit-rfp/edit-rfp'));
const ProposalDashboard = lazy(() => import('../components/rfp-dashboard/rfp-dashboard'));
const ShowProposal = lazy(() => import('../components/forms/rfp/show-rfp/show-rfp'));
const ProposalMessage = lazy(() => import('../components/message-center/message-center'));
const NewMessage = lazy(() => import('../components/message-center/new-message/new-message'));
const PreviewMessage = lazy(() => import('../components/message-preview/message-preview'));
const InviteSupplier = lazy(() => import('../components/invite-supplier/invite-supplier'));
const RFxNew = lazy(() => import('../components/rfx/rfx-new/rfx-new'));
const CompareBids = lazy(() => import('../components/compare-bids/compare-bids'));
const TenantSettings = lazy(() => import('../pages/buyer/settings/settings'));
const ViewBid = lazy(() => import('../pages/buyer/view-bid/view-bid'));

const routes = [
  {
    exact: true,
    path: '/users',
    main: () => <Users />,
  },
  {
    exact: true,
    path: '/user/settings',
    main: () => <TenantSettings />,
  },
  {
    exact: true,
    path: '/user/invitation',
    main: () => <UserInvitation />,
  },
  {
    exact: true,
    path: '/supplier/invitation',
    main: () => <InviteSupplier />,
  },
  {
    exact: true,
    path: '/:company_id/requisitions',
    main: () => <Requisitions />,
  },
  {
    exact: true,
    path: '/:company_id/requisitions/new',
    main: () => <NewRequisition />,
  },
  {
    exact: true,
    path: '/vendors/new',
    main: () => <Vendors />,
  },

  {
    exact: true,
    path: '/quotes/new',
    main: () => <Newquote />,
  },

  {
    exact: true,
    path: '/rfx',
    main: () => <RFX />,
  },

  {
    exact: true,
    path: '/rfx/new',
    main: () => <RFxNew />,
  },
  {
    exact: true,
    path: '/rfx/proposal/create/new',
    main: () => <NewProposal />,
  },
  {
    exact: true,
    path: '/rfx/proposal/dashboard/:id',
    main: () => <ProposalDashboard />,
  },
  {
    exact: true,
    path: '/rfx/proposal/dashboard/:id/bids/:bidID/view',
    main: () => <ViewBid />,
  },
  {
    exact: true,
    path: '/rfx/proposal/:id/compare-bids',
    main: () => <CompareBids />,
  },
  {
    exact: true,
    path: '/rfx/proposal/show/:id',
    main: () => <ShowProposal />,
  },
  {
    exact: true,
    path: '/rfx/proposal/:id/message',
    main: () => <ProposalMessage />,
  },
  {
    exact: true,
    path: '/rfx/proposal/:id/message/create/new',
    main: () => <NewMessage />,
  },
  {
    exact: true,
    path: '/rfx/proposal/:id/message/:message_id',
    main: () => <PreviewMessage />,
  },
  {
    exact: true,
    path: '/rfx/proposal/:id/edit',
    main: () => <EditProposal />,
  },
];

export default routes;
