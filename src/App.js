/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-array-index-key */
import React, { Suspense } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/layout';
import SignIn from './components/auth/sign-in/sign-in';
import PageNotFound from './pages/_404';
// import UserInvitation from './components/forms/user-invitation/new-invitation/user-invitation';
import CreateNewTenant from './components/forms/tenant/create-new-tenant';
import CreateUser from './components/forms/user/create-user/create-user';
import ResetPassword from './components/forms/user/reset-password/reset-password';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PageLoader from './components/page-loader/page-loader';
import MainContent from './components/kt-main-content/mainContent';
import routes from './routes/protected-routes';

function App() {
  return (
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
					<PageLoader />
				</MainContent>
			</Layout>
		)}
		>
			<Layout>
				{routes.map((route, index) => (
					<ProtectedRoute
						key={index}
						path={route.path}
						exact={route.exact}
					>
						<route.main />
					</ProtectedRoute>
				))}
			</Layout>
		</Suspense>
		<Route path="*">
			<PageNotFound />
		</Route>
	</Switch>
  );
}

export default App;
