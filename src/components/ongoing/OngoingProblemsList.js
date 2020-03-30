import React, { Component } from 'react'
import NavBar from '../navbar/nav';
import axios from 'axios';
import {Link, NavLink } from 'react-router-dom';
import Utils from '../Utils/utils';
import OngoingTimer from './OngoingTimer';

export default class OngoingProblemsList extends Component {

     state ={
          problems : [],
          loading : true,
          contestProblemsList : [],
     }
     componentDidMount(){
          let path = `https://api.codechef.com/contests/${localStorage.getItem('OngoingcontestCode')}`;
          axios.get( path , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
          .then(res=>{
               const data = res.data.result.data.content.problemsList;
               // console.log(res);
               this.setState({
                    contestProblemsList : data ,
                    loading : false
               })
          }).catch(err=> {
               try{
                    if(err.response.status===401){
                         Utils.generateAccessToken();
                         alert('Some error occured...please refresh page')
                    }
               }catch(e){
                    
                    alert('Some error occured...please refresh page or login')
                    console.log(err)
               }
          })
     }
     render() {
          const { loading ,contestProblemsList} = this.state;

          const problemsList = (contestProblemsList) ?   contestProblemsList.map(problem=>{
               let accuracy = 0;
               try{
                    accuracy = problem.accuracy;
                    accuracy = accuracy.toFixed(2)     
               }finally{
                    return(
                         <tr key={problem.problemCode} >
                              <td >
                                   <Link to={`${problem.contestCode}/problems/${problem.problemCode}`}>{problem.problemName ? problem.problemName : problem.problemCode}</Link>
                              </td>
                              <td >
                                   <Link to={`${problem.contestCode}/problems/${problem.problemCode}`}>{problem.problemCode}</Link>
                              </td>
                              <td>
                                   {problem.successfulSubmissions}
                              </td>
                              <td>
                                   {accuracy}
                              </td>
                         </tr>
                    )
               }
               
          }) : null;

          let showop;
          if(loading) {
               showop = <h4 className="center">Loading Problems</h4>
          }
          else{
               showop = problemsList ?<div className="contest">  
                         <h4>{localStorage.getItem('OngoingcontestCode')}</h4> 
                         <table className="highlight centered responsive-table">
                                   <thead>
                                        <tr>
                                        <th>Name</th>
                                        <th>Code</th>
                                        <th>Sucessful Submissions</th>
                                        <th>Accuracy</th>
                                        {/* you can add submit button also */}
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {problemsList}
                                   </tbody>
                         </table>
                    </div>
                    : null
          }
          return (
               <div className="wrapper">
                    <NavBar></NavBar>
                    <div className="container" >
                         
                         <div className="row">
                              <div className="col l8">
                                  {showop}                                  
                              </div>
                              <div className="col l4 center-align" style={{marginTop : 100}}>
                                   <OngoingTimer/>
                                   <div className="card">
                                        <div className="card-content">
                                             <div className="card-title"><strong>Contest Ranks</strong> </div>
                                             <div className="divider grey darken-2"></div>
                                             <div className="input-field center">     
                                                       <NavLink to={ localStorage.getItem('OngoingcontestCode') + '/ranking'} onClick={this.handleSubmit}  name="Submit" id="submit-btn"  className="btn waves-effect waves-light">Go to Contest Rank</NavLink>     
                                             </div>
                                        </div>
                                   </div>
                                   
                              
                              </div>
                         </div>
                    </div>
               </div>
          )
     }
}
