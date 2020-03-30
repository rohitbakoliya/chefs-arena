import React, { Component } from 'react'
import {NavLink } from 'react-router-dom';
import NavBar from '../navbar/nav';
import '../selectContest/selectVirtual.js';
import Utils from '../Utils/utils';
import axios from 'axios';
import ShowAllOngoing from './showAllOngoing';

export default class SelectOngoing extends Component {

     state = {
          data : [],
          loading : true,
          toggle : false,
          msg : 'Show all Contests'
     }
     handleClick = (e)=>{
          this.setState({
               toggle : !this.state.toggle,
               msg : this.state.msg === 'Show all Contests' ? 'Hide Contests' : 'Show all Contests'
          })
     }
     componentDidMount(){
          (async () => {
               let path = 'https://api.codechef.com/contests?status=present';
               this.contestListRequest(path)
          })();
     }
     injectScript(){
          const script = document.createElement("script");
          script.async = true;
          script.innerHTML = `
          $(document).ready(async function(){
            const data = await JSON.parse(localStorage.getItem('allOngoing'));
            let dataForAutocomplete = {};
            data.forEach(contest => {
                 dataForAutocomplete[contest.code] = null;
                 dataForAutocomplete[contest.name] = null;
            });
            $('input.autocomplete').autocomplete({
              data: dataForAutocomplete,
               onAutocomplete : function(val){
                    let objName = data.find(o => o.name === val);
                    let objCode = data.find(o => o.code === val);
                    // console.log(objName ,objCode );
                    let obj = {};
                    if(objName===undefined){
                         obj = objCode;
                    }else{
                         obj = objName;
                    }
                    localStorage.setItem('OngoingcontestCode' , obj.code)
                    localStorage.setItem('OngoingcontestDetails' , JSON.stringify(obj));   
                    // const contestDetails = JSON.parse(localStorage.getItem('contestDetails') ) ;
               
               }
            });
            
          });
             `
          this.instance.appendChild(script);
     }
     contestListRequest  =  (path)=> {
          axios.get( path , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
          .then(res=>{
               // console.log(res.data.result.data.content.contestList);
               const data = JSON.stringify(res.data.result.data.content.contestList);
               localStorage.setItem('allOngoing' , data);
               this.setState({
                    data : res.data.result.data.content.contestList,
                    loading : false
               } , ()=> this.injectScript())
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
     render(){
          return (
               <div className="wrapper">
                    <NavBar/>
                    <div className="container">
                    <div className="row auto-search">
                         <div className="col s12">
                              <div className="row">
                                   <div className="input-field col s8">
                                             <i className="material-icons prefix">search</i>
                                             <input type="text" autoComplete="off" id="autocomplete-input" className="autocomplete"/>
                                             <label htmlFor="autocomplete-input" className="hide-on-small-only" >Contest Name or Contest Code</label>
                                        </div>
                                        <div className="input-field col s4 center">        
                                             <NavLink to='/contests/problems'  name="Submit" id="submit-btn"  className="btn waves-effect waves-light">Register</NavLink>     
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div style={{marginTop : 100}}>
                              <a onClick={this.handleClick} style={{cursor : 'pointer' , textDecoration : 'underline' ,marginTop : 100}}>
                                   {this.state.msg}
                              </a>
                              {this.state.toggle ?   <ShowAllOngoing/> : null }
                         </div>
                         
                    </div>
                    <div ref={el => (this.instance = el)}></div>
               </div>
          );
     }
}
