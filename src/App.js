import React, {lazy, Suspense} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './redux/store';
import Layout from './components/Layout/layout';
import { Switch, Route } from 'react-router-dom';
import SignIn from './components/auth/sign-in/sign-in';
import PageNotFound from './pages/_404';
import UserInvitation from './components/forms/user-invitation/new-invitation/user-invitation.jsx';
import CreateNewTenant from './components/forms/tenant/create-new-tenant';
import CreateUser from './components/forms/user/create-user/create-user';

const Home = lazy(() => import  ('./pages/home'));
const NewRequisition = lazy(() => import('./components//forms/requisitions/new/new-requisitions'));
const Requisitions = lazy(() => import('./components/forms/requisitions/show/requisitions-index'));
const Newquote = lazy(() => import('./components/forms/quotes/new/new-quote'));
const RFX = lazy(() => import('./components/rfx/rfx'));
const Vendors = lazy(() => import('./components/forms/vendors/vendors'));

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home/>
  },
  {
    path: "/auth/signin",
    main: () => <SignIn />
  },
  {
    path: "/user/invitation",
    main: () => <UserInvitation />
  },
  {
    exact: true,
    path: "/requisitions",
    main: () => <Requisitions />
  },
  {
    exact: true,
    path: "/requisitions/new",
    main: () =><NewRequisition />
  },

  {
    exact: true,
    path: "/vendors/new",
    main: () =><Vendors />
  },

  {
    exact: true,
    path: "/quotes/new",
    main: () =><Newquote />
  },

  {
    exact: true,
    path: "/rfx",
    main: () =><RFX />
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
			<Route exact path={`/user/invitation/confirm/:token`}>
				<CreateUser />
			</Route>
			<Route exact path={`/tenant/signup`}>
				<CreateNewTenant />
			</Route>
			<Suspense fallback={<Layout><h1> loading ...</h1> </Layout>} >
				<Layout>
					{routes.map((route, index) => (
        // Render more <Route>s with the same paths as
        // above, but different components this time.
						<Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
          ))}
				</Layout>
			</Suspense>
			<Route path="*">
				<PageNotFound />
			</Route>
		</Switch>
		{/* <Switch>
			<Suspense fallback={<Layout><h1> loading ...</h1> </Layout>} >
      <ProtectedRoute exact path="/auth/signin" component= {SignIn} />
      <Layout >
				<ProtectedRoute exact path="/" component={Home}/>
			
			
				<ProtectedRoute exact path="/rfx" component={<RFX/>}/>
        <ProtectedRoute exact path="/requisitions" component={Requisitions}/>
				<ProtectedRoute exact path="/requisitions/new" component={NewRequisition}/>
				<ProtectedRoute exact path="/quotes/new" component={Newquote}/>
				<ProtectedRoute exact path="/vendors/new" component={Vendors}/>
        </Layout>
        <ProtectedRoute  path="*" component={PageNotFound}   /> 
			</Suspense>
			
		</Switch>
  */}

		{/* <Switch>
			<Route  path="/auth/signin" component={SignIn}/>
			<Layout>
				<Suspense fallback={<h1> loading ...</h1>}>
					<ProtectedRoute exact path="/"> <Home /> </ProtectedRoute>
					<ProtectedRoute exact path="/requisitions" > <Requisitions/> </ProtectedRoute>
					<ProtectedRoute exact path="/requisitions/new" >  <NewRequisition/> </ProtectedRoute>
					<ProtectedRoute exact path="/quotes/new" > <Newquote/> </ProtectedRoute>
					<ProtectedRoute exact path="/rfx"> <RFX/> </ProtectedRoute>
					<ProtectedRoute exact path="/vendors/new" > <Vendors/> </ProtectedRoute>
				</Suspense>
				<Route > <PageNotFound/> </Route>
			</Layout>
		</Switch> */}
	</Provider>
  );
}
export default App;
 