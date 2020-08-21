/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-array-index-key */
import React, { Suspense } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import shortid from 'shortid';
import Layout from './components/Layout/layout';
import SignIn from './components/auth/sign-in/sign-in';
import PageNotFound from './pages/_404';
import CreateNewTenant from './components/forms/tenant/create-new-tenant';
import CreateUser from './components/forms/user/create-user/create-user';
import ResetPassword from './components/forms/user/reset-password/reset-password';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import BuyerProtectedRoute from './components/buyer-protected/buyer-protected';
import SupplierProtectedRoutes from './components/supplier-protected/supplier-protected';
import PageLoader from './components/page-loader/page-loader';
import MainContent from './components/kt-main-content/mainContent';
import routes from './routes/protected-routes';
import buyerRoutes from './routes/buyer-protected-routes';
import supplierRoutes from './routes/supplier-protected-routes';

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
				{routes.map((route) => (
					<ProtectedRoute
						key={shortid.generate()}
						path={route.path}
						exact={route.exact}
					>
						<route.main />
					</ProtectedRoute>
				))}

				{buyerRoutes.map((route) => (
					<BuyerProtectedRoute
						key={shortid.generate()}
						path={route.path}
						exact={route.exact}
					>
						<route.main />
					</BuyerProtectedRoute>
				))}

				{supplierRoutes.map((route) => (
					<SupplierProtectedRoutes
						key={shortid.generate()}
						path={route.path}
						exact={route.exact}
					>
						<route.main />
					</SupplierProtectedRoutes>
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
