import React from 'react';
import { AuthRoute, ProtectedRoute} from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import GrammarContainer from './grammer/grammar_container'
import HistoryContainer from './history/history_container'

import './reset.css'



const App = () => (
  <div>
    <NavBarContainer />
    <AuthRoute exact path="/" component={MainPage} />
    <AuthRoute exact path="/login" component={MainPage} />
    <AuthRoute exact path="/signup" component={MainPage} />

    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/history" component={HistoryContainer} />

      <ProtectedRoute exact path="/grammar" component={GrammarContainer} />
    </Switch>
  </div>
);

export default App;