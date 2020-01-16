import React, {Suspense, lazy} from 'react';
import {Switch, Route} from 'react-router-dom';


const Home = lazy(() => import  ('../../pages/home'));
const PageNotFound = lazy(() => import('../../pages/_404'));
const NewRequisition = lazy(() => import('../../components/requisitions/new/new-requisitions'));
const Requisitions = lazy(() => import('../../components/requisitions/show/requisitions-index'));
const Newquote = lazy(() => import('../quotes/new/new-quote'));
const RFX = lazy(() => import('../rfx/rfx'));
const Vendors = lazy(() => import('../forms/vendors/vendors'));

const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/requisitions" component={Requisitions}/>
        <Route path="/requisitions/new" component={NewRequisition}/>
        <Route path="/quotes/new" component={Newquote}/>
        <Route path="/rfx" component={RFX}/>
        <Route path="/vendors/new" component={Vendors}/>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default Router
