/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-array-index-key */
import React, { lazy, Suspense } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import store from './redux/store';
import Layout from './components/Layout/layout';
import SignIn from './components/auth/sign-in/sign-in';
import PageNotFound from './pages/_404';
import UserInvitation from './components/forms/user-invitation/new-invitation/user-invitation';
import CreateNewTenant from './components/forms/tenant/create-new-tenant';
import CreateUser from './components/forms/user/create-user/create-user';
import ResetPassword from './components/forms/user/reset-password/reset-password';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import KtLoader from './components/loader/loader';
import MainContent from './components/kt-main-content/mainContent';

const Home = lazy(() => import('./pages/home'));
const NewRequisition = lazy(() => import('./components/forms/requisitions/new/new-requisitions'));
const Requisitions = lazy(() => import('./components/forms/requisitions/show/requisitions-index'));
const Newquote = lazy(() => import('./components/forms/quotes/new/new-quote'));
const RFX = lazy(() => import('./components/rfx/show/rfx'));
const Vendors = lazy(() => import('./components/forms/vendors/vendors'));
const Users = lazy(() => import('./components/forms/user/show-users/show-users'));
const NewProposal = lazy(() => import('./components/forms/rfp/rfp'));
const EditProposal = lazy(() => import('./components/forms/rfp/edit-rfp/edit-rfp'));
const ProposalDashboard = lazy(() => import('./components/rfp-dashboard/rfp-dashboard'));
const ShowProposal = lazy(() => import('./components/forms/rfp/show-rfp/show-rfp'));
const ProposalMessage = lazy(() => import('./components/message-center/message-center'));
const NewMessage = lazy(() => import('./components/message-center/new-message/new-message'));
const PreviewMessage = lazy(() => import('./components/message-preview/message-preview'));
const InviteSupplier = lazy(() => import('./components/invite-supplier/invite-supplier'));
const RFxNew = lazy(() => import('./components/rfx/rfx-new/rfx-new'));

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />,
  },
  {
    exact: true,
    path: '/auth/signin',
    main: () => <SignIn />,
  },
  {
    exact: true,
    path: '/auth/password/:token',
    main: () => <ResetPassword />,
  },
  {
    exact: true,
    path: '/users',
    main: () => <Users />,
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

function App() {
  return (
	<Provider
		store={store}
	>
		<Switch>
			<Route path="/auth/signin">
				<SignIn />
			</Route>
			<Route path="/auth/password/:token">
				<ResetPassword />
			</Route>
			<Route exact path="/user/invitation/confirm/:token">
				<CreateUser />
			</Route>
			<Route exact path="/tenant/signup">
				<CreateNewTenant />
			</Route>
			<Suspense fallback={(
				<Layout>
					<MainContent>
						<KtLoader />
					</MainContent>
				</Layout>
			)}
			>
				{/* <Layout> */}
				{routes.map((route, index) => (
					<ProtectedRoute
						key={index}
						path={route.path}
						exact={route.exact}
					>
						<Layout>
							<route.main />
						</Layout>
					</ProtectedRoute>
				))}
				{/* </Layout> */}
			</Suspense>
			<Route path="*">
				<PageNotFound />
			</Route>
		</Switch>
	</Provider>
  );
}

export default App;
