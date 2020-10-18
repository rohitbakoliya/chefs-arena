import React , {Component} from 'react';
import Contest from './contest'
import NavBar from '../common/navbar/nav';

//  "proxy" : "https://api.codechef.com/",
  
export default class Dashboard extends Component{
     render(){
          return(
               <div className="dashboard">
                    <NavBar/>
                    <Contest/>
                    
               </div>
          );
     }
}