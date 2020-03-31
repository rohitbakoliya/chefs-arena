import React , { Component} from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import Root from './components/home/root';
import Dashboard from './components/dashboard/dashboard';
import SelectVirtual from './components/selectContest/selectVirtual';
import Problem from './components/problems/Problem';
import ProblemsList from './components/problems/ProblemsList'
import Timer from './components/timer/Timer';
import User from './components/user/User';
import Run from './components/run/run'
import SelectOngoing from './components/ongoing/selectOngoing';
import OngoingProblemsList from './components/ongoing/OngoingProblemsList';
import OngoingProblem from './components/ongoing/OngoingProblem';
import Ranking from './components/ongoing/Ranking/Ranking'
import Error404 from './components/404/Error404';

class App extends Component{
  render(){
    return (
      <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Root}/>
              <Route path='/dashboard' component={Dashboard}/>
              <Route path='/virtual' component={SelectVirtual}/>
              <Route exact path='/contests' component={SelectOngoing}/>
              <Route path='/contests/problems' component={OngoingProblemsList}/>
              <Route path='/contests/:contestCode/problems/:problemCode' component={OngoingProblem}/>
              <Route path='/contests/:contestCode/ranking' component={Ranking}/>
              <Route exact path='/problems' component={ProblemsList}/>
              <Route path='/problems/:problemCode' component={Problem}/>
              <Route path='/user' component={User}/>
              <Route path='/timer' component={Timer}/>
              <Route path='/run/:problemCode' component={Run}/>
              <Route component={Error404} />
              
            </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;