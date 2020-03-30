import React , {Component} from 'react';
import './contest.css'
import { NavLink } from 'react-router-dom';

export default class Contest extends Component{

     render(){
          return(
               <section className="contests " style={{marginTop : 80}}>
                    <div className="row flex"  >
                         <div className="col s12 l6 column">
                              <div className="card-panel">
                                   <div className="card-content center-align">
                                        <h5 className="card-title">
                                             Create Virtual Contest
                                        </h5>
                                        <div className="divider"></div> 
                                        <p>
                                             Participate in the Past contests against a clock! 
                                        </p>
                                   </div>
                                   <div className="card-action center">
                                        <NavLink to="/virtual" className="btn waves-effect waves-light">Enter</NavLink>
                                   </div>
                              </div>
                         </div>
                         <div className="col s12 l6 column">
                              <div className="card-panel middle-panel">
                                   <div className="card-content center-align">
                                        <h5 className="card-title">
                                             Participate in ongoing contests
                                        </h5>
                                        <div className="divider"></div> 
                                        <p>
                                             Here you can Participate in ongoing COOKOFF challanges (if there any)  
                                        </p>
                                   </div>
                                   <div className="card-action center">
                         {/* TODO : If user already participated then show popup using models */}
                                        <NavLink to="/contests" className="btn waves-effect waves-light">Enter</NavLink>
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>
          )
     }

}