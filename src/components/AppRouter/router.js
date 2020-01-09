import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from '../../pages/home';
import PageNotFound from '../../pages/_404';

const router = () => {
  return (
    <Switch>
      <Route exact path="/" >
        <Home/>
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  )
}

export default router
