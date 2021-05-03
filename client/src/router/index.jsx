import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import CreateFlujoScreen from '../view/home';
import CompleteFlujoScreen from '../view/flujoSteps';

export default function MainRouter() {
  return (
    <Router>
      <div>
      </div>
      <Switch>
        <Route path="/flujo/:id" exact component={CompleteFlujoScreen} />
        <Route path="/" exact component={CreateFlujoScreen} />
        <Redirect to="/"  />
      </Switch>
    </Router>
  );
}
