import React from 'react';
import { AuthRoute, ProtectedRoute} from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import Performance from './peroformace'
import GrammarContainer from './grammer/grammar_container'

import './reset.css'

import Speech from './speech/speech_container'


const App = () => (
  <div>
    {/* <Performance /> */}
    <NavBarContainer />
    <AuthRoute path="/" component={MainPage} />
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/grammar" component={GrammarContainer} />
      <Route exact path="/speech" component={Speech} />
    </Switch>
  </div>
);

export default App;