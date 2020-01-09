import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from '../../pages/home';
import PageNotFound from '../../pages/_404';
import NewRequisition from '../../components/requisitions/new/new-requisitions';
import Requisitions from '../../components/requisitions/show/requisitions-index';

const router = () => {
  return (
    <Switch>
      <Route exact path="/" >
        <Home/>
      </Route>
      <Route exact path="/requisitions" component={Requisitions}/>
      <Route path="/requisitions/new" component={NewRequisition}/>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
}

export default router
