import React, { Component } from 'react'
import NavBar from '../../common/navbar/nav';
import axios from 'axios';
import {Link ,Redirect} from 'react-router-dom';
import Timer from '../../timer/Timer';
import Utils from '../../utils/utils';
import Preloader from '../../common/Preloader/Preloader'
export default class ProblemsList extends Component {

     state ={
          problems : [],
          loading : true,
          contestProblemsList : [],
          isParent : false,
          children : []
     }
     componentDidMount(){
          let path = `https://api.codechef.com/contests/${localStorage.getItem('contestCode')}`;
          axios.get( path , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
          .then(res=>{
               const data = res.data.result.data.content.problemsList;
               const content = res.data.result.data.content;
               console.log(content)
               if(content.isParent){
                    this.setState({
                         isParent : true,
                         children : content.children
                    })
               }
               this.setState({
                    contestProblemsList : data 
               } ,()=> this.makeRequestForEachProblemUtil(data))
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
     makeRequestForEachProblemUtil = (data)=>{
               data.forEach(problem => {
                   this.makeRequestForEachProblem(problem.problemCode)
               });
     }
     makeRequestForEachProblem = (problemCode)=>{
          let path = `https://api.codechef.com/contests/${localStorage.getItem('contestCode')}/problems/${problemCode}`
          let toggle = true;
          if(localStorage.getItem('problemsList')!==null)
          {
               let list =JSON.parse(localStorage.getItem('problemsList'));
               if(list.find(x=> x.problemCode === problemCode)){
                    toggle = false;
               }
          }
          if(localStorage.getItem('problemsList')===null || toggle)
          {
               axios.get( path , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
               .then(res=>{
                    this.setState({
                         problems : [...this.state.problems , res.data.result.data.content]
                    } , ()=> localStorage.setItem('problemsList' , JSON.stringify(this.state.problems)));
                    // const data = JSON.stringify(res.data.result.data.content);
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
          this.setState({
               loading : false
          })
     }
     render() {
          const { loading ,contestProblemsList} = this.state;
          const problems =JSON.parse(localStorage.getItem('problemsList')) ;
          const problemsList = (contestProblemsList.length && problems) ?   problems.map(problem=>{
               let obj = contestProblemsList.find(o=> o.problemCode === problem.problemCode);
               let accuracy = 0;
               try{
                    accuracy = obj.accuracy;
                    accuracy = accuracy.toFixed(2)
               }
               finally{
               return(
                    <tr key={problem.problemCode} >
                         <td >
                              <Link to={`/problems/${problem.problemCode}`}>{problem.problemName}</Link>
                         </td>
                         <td >
                              <Link to={`/problems/${problem.problemCode}`}>{problem.problemCode}</Link>
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
          }
          else{
               showop = problemsList ?  <table className="highlight centered responsive-table">
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
                         : null
          }
          return (
               <div className="wrapper">
                    <NavBar></NavBar>
                    <div className="container" >
                         {/* {this.renderRedirect()} */}
                         {this.state.isParent ? 
                         <div className="children center">
                              <h6>This contest has subcontests</h6>
                              {this.state.children.map(child=>{
                                   return(
                                        <li key={child}>{child}</li>
                                   )
                              })}
                              <p>Please Participate in them</p>
                         </div>
                         :  
                              <div className="row"style={{marginTop : 100}} >
                              <div className="col l8">
                                  {showop}                                  
                              </div>
                              <div className="col l4 center-align">
                                   <Timer/>
                              </div>
                              </div>
                         }
                         
                    </div>
               </div>
          )
     }
}
