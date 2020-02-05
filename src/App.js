import React, {lazy, Suspense} from 'react';
import './App.css';
import AppRouter from './components/AppRouter/router';
import Header from './components/header/header';
import Nav from './components/navigation/navigation';
import {Provider} from 'react-redux';
import store from './redux/store';
import Message from './components/kt-floating-message/message';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/layout';
import { Switch, Route } from 'react-router-dom';
import SignIn from './components/auth/sign-in/sign-in';
import PageNotFound from './pages/_404';

// const Layout = lazy(() => import('./components/Layout/layout'));
const Home = lazy(() => import  ('./pages/home'));
const NewRequisition = lazy(() => import('./components//forms/requisitions/new/new-requisitions'));
const Requisitions = lazy(() => import('./components/forms/requisitions/show/requisitions-index'));
const Newquote = lazy(() => import('./components/forms/quotes/new/new-quote'));
const RFX = lazy(() => import('./components/rfx/rfx'));
const Vendors = lazy(() => import('./components/forms/vendors/vendors'));
// const SignIn = lazy(() => import('./components/auth/sign-in/sign-in'));
// const PageNotFound = lazy(() => import('./pages/_404'))

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
    exact: true,
    path: "/requisitions/",
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
 