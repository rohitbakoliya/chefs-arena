import React , { Component} from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import Root from './components/home/root';
import Dashboard from './components/dashboard/dashboard';
import SelectVirtual from './components/virtual/selectContest/selectVirtual';
import Problem from './components/virtual/problems/Problem';
import ProblemsList from './components/virtual/problems/ProblemsList'
import Timer from './components/timer/Timer';
import User from './components/user/User';
import Run from './components/Ide/run'
import SelectOngoing from './components/ongoing/selectOngoing';
import OngoingProblemsList from './components/ongoing/OngoingProblemsList';
import OngoingProblem from './components/ongoing/OngoingProblem';
import Ranking from './components/ongoing/Ranking/Ranking'
import Error404 from './components/common/404/Error404';
import ProtectedRoute from './routes/protectedRoute';
import Auth from './components/auth/auth';

import './App.css';

class App extends Component{
  render(){
    return (
      <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Root}/>
              <Route exact path='/auth' component={Auth}/>
              <ProtectedRoute path='/dashboard' component={Dashboard}/>
              <ProtectedRoute path='/virtual' component={SelectVirtual}/>
              <ProtectedRoute exact path='/contests' component={SelectOngoing}/>
              <ProtectedRoute exact path='/contests/problems' component={OngoingProblemsList}/>
              <ProtectedRoute exact path='/contests/:contestCode/problems/:problemCode' component={OngoingProblem}/>
              <ProtectedRoute exact path='/contests/:contestCode/ranking' component={Ranking}/>
              <ProtectedRoute exact path='/problems' component={ProblemsList}/>
              <ProtectedRoute exact path='/problems/:problemCode' component={Problem}/>
              <ProtectedRoute path='/user' component={User}/>
              <ProtectedRoute path='/timer' component={Timer}/>
              <ProtectedRoute path='/run/:problemCode' component={Run}/>
              <ProtectedRoute path='/ide' component={Run}/>
              <Route component={Error404} />
              
            </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;