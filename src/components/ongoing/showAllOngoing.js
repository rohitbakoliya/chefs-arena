import React, { Component } from 'react'
import {NavLink } from 'react-router-dom';
export default class ShowAllOngoing extends Component {

     state = {
          data : this.props.data
     }
     
     contestClick = (contest)=>{
          localStorage.setItem('OngoingcontestCode' , contest.code)
          localStorage.setItem('OngoingcontestDetails' , JSON.stringify(contest));
     }
     render() {
          const {data} = this.state;
          var list = data ? 
               data.map(contest=>{
                    return(
                    <tr key={contest.code} >
                         <td >
                              <NavLink onClick={()=>this.contestClick(contest)} to={'/contests/problems'} >{contest.code}</NavLink>
                         </td>
                         <td >
                              <NavLink  onClick={()=>this.contestClick(contest)} to={'/contests/problems'} >{contest.name}</NavLink>
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
          let showop = list ? <div className="card">
               <div className="card-content">
                    <div className="card-title"><h3 style={{margin: 2, fontWeight: 'normal'}} className="center">Onging Contests</h3> </div>
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
          return (
               <div>
                    {showop}
               </div>
          );
     }
}
