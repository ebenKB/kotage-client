import React from 'react'
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import Home from '../../pages/home';
import PageNotFound from '../../pages/_404';

const router = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <Home/>
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  )
}

export default router
