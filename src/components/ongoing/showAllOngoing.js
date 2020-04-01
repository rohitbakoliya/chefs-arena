import React, { Component } from 'react'
import {NavLink } from 'react-router-dom';
import Utils from '../Utils/utils';
import axios from 'axios';

export default class ShowAllOngoing extends Component {

     state = {
          data : [],
          loading : true
     }
     componentDidMount(){
          (async () => {
               let path = 'https://api.codechef.com/contests?status=present';
               this.contestListRequest(path)
          })();
     }
     contestListRequest  =  (path)=> {
          axios.get( path , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
          .then(res=>{
               // console.log(res.data.result.data.content.contestList);
               this.setState({
                    data : res.data.result.data.content.contestList,
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
          const {data ,loading} = this.state;
          var list = data ? 
               data.map(contest=>{
                    return(
                    <tr key={contest.code} >
                         <td >
                              <NavLink onClick={()=>localStorage.setItem('OngoingcontestCode' , contest.code)} to="/contests/problems">{contest.code}</NavLink>
                         </td>
                         <td >
                              <NavLink  onClick={()=>localStorage.setItem('OngoingcontestCode' , contest.code)} to="/contests/problems">{contest.name}</NavLink>
                         </td>
                         <td>
                              {contest.startDate}
                         </td>
                         <td>
                              {contest.endDate}
                         </td>
                         
                    </tr>
               )
          }) : null;
          let showop;
          if(loading) {
               showop = <h4 className="center">Loading Contests...</h4>
          }
          else{
               showop = list ? <div className="card">
               <div className="card-content">
                    <div className="card-title"><h4 className="center">Onging Contests</h4> </div>
                    <table className="highlight centered responsive-table">
                                   <thead>
                                        <tr>
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {list}
                                   </tbody>
                         </table>
                    </div>  
               </div>
               : null
          }
          return (
               <div>
                    {showop}
               </div>
          );
     }
}
