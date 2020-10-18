import React, { Component } from 'react'
import NavBar from '../common/navbar/nav';
import axios from 'axios';
import {Link, NavLink } from 'react-router-dom';
import Utils from '../utils/utils';
import OngoingTimer from './OngoingTimer';
import Preloader from '../common/Preloader/Preloader';

import RecentSubmissions from './RecentSubmissions/RecentSubmissions'
export default class OngoingProblemsList extends Component {

     state ={
          problems : [],
          loading : true,
          contestProblemsList : [],
          showIcon : 'add',
          noProblem : false
     }
     componentDidMount(){
          let path = `https://api.codechef.com/contests/${localStorage.getItem('OngoingcontestCode')}`;
          axios.get( path , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
          .then(res=>{
               const data = res.data.result.data.content.problemsList;
               if(data.length === 0){
                    this.setState({
                         noProblem : true
                    })
               }
               // console.log(res);
               this.setState({
                    contestProblemsList : data ,
                    loading : false,
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
     handleSubmissions = ()=>{
          this.setState({
               showIcon : this.state.showIcon === 'add' ? 'close' : 'add'
          });
     }

     render() {
          const { loading ,contestProblemsList , showIcon } = this.state;

          const problemsList = (contestProblemsList) ?   contestProblemsList.map(problem=>{
               let accuracy = 0;
               try{
                    accuracy = problem.accuracy;
                    accuracy = accuracy.toFixed(2)     
               }finally{
                    return(
                         <tr key={problem.problemCode} >
                              <td >
                                   <Link to={'/contests/'+problem.contestCode + '/problems/'+ problem.problemCode}>{problem.problemName ? problem.problemName : problem.problemCode}</Link>
                              </td>
                              <td >
                                   <Link to={'/contests/'+problem.contestCode + '/problems/'+ problem.problemCode}>{problem.problemCode}</Link>
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
               showop = <div style={{  position: 'absolute',
                    top: '50%',
                    left: '40%',
                    transform: 'translate(-50%, -50%)'}}><Preloader/></div> 
               //<h4 className="center">Loading Problems</h4>
          }
          else{
               showop = problemsList ?<div className="contest">  
                         <div className="card">
                              <div className="card-content">
                                   <strong className="card-title" style={{fontWeight: 'bold', fontSize: '20px'}}>Problems</strong>
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
                         </div>
                    </div>
                    : null
          }
          return (
               <div className="wrapper">
                    <NavBar></NavBar>
                    <div className="container" >
                         {this.state.noProblem ? <div className="center"><h4 >Contest dosn't have any problems* or it's private</h4> <p>-Sometimes this might happens when contest has any subcontest</p></div> :
                         <div className="row" style={{marginTop : 20}}>
                              <div className="col l8">
                                  {showop}                                  
                              </div>
                              <div className="col l4 center-align" >
                              <div className="card">
                                   <div className="card-title" style={{padding: '20px'}}>
                                        <strong>Contest Code : {localStorage.getItem('OngoingcontestCode')}</strong> 
                                   </div>
                              </div>

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
                                   <div className="card">
                                        <div className="card-content">
                                             <div className="card-title">
                                                  <strong>Recent Activity</strong> 
                                                  <i style={{cursor : 'pointer'}} onClick={this.handleSubmissions} className="material-icons right grey-text">{showIcon}</i>
                                             </div>
                                             {showIcon==='close' ? <RecentSubmissions contestCode={ localStorage.getItem('OngoingcontestCode')}/> : null}
                                        </div> 
                                   </div>
                              </div>
                         </div>}
                    </div>
               </div>
          )
     }
}
