import React, { Component } from 'react'
import {NavLink } from 'react-router-dom';
import NavBar from '../navbar/nav';
import './selectVirtual.css';
import Utils from '../Utils/utils';
// import axios from 'axios'

export default class SelectVirtual extends Component {

     state = {
          route : '/virtual',
          loading : true
     }
     injectOnReadyScript(){
          const script = document.createElement("script");
          script.async = true;
          script.innerHTML = `$(document).ready(function(){
               let path = 'https://api.codechef.com/contests?status=past';
               fetch( path , {headers : {"content-Type" : "application/json" ,"Authorization" : \`Bearer ${localStorage.getItem('access_token')}\` }})
               .then(res => res.json())
               .then(res=>{
                    try{
                         const data = res.result.data.content.contestList;
                         const contestList = JSON.stringify(res.result.data.content.contestList);
                         localStorage.setItem('contestList' , contestList);
                         let dataForAutoComplete = {};
                         data.forEach( contest => {
                              dataForAutoComplete[contest.code] = null;
                              dataForAutoComplete[contest.name] = null;
                         });
                         $('input.autocomplete').autocomplete({
                              data: dataForAutoComplete,
                              // limit : 10
                              onAutocomplete : function(val){
                                   let objName = data.find(o => o.name === val);
                                   let objCode = data.find(o => o.code === val);
                                   console.log(objName ,objCode );
                                   let obj = {};
                                   if(objName===undefined){
                                        obj = objCode;
                                   }else{
                                        obj = objName;
                                   }
                                   localStorage.setItem('contestCode' , obj.code)
                                   localStorage.setItem('contestDetails' , JSON.stringify(obj));   
                                   // const contestDetails = JSON.parse(localStorage.getItem('contestDetails') ) ;
                         
                              // SETUP FOR TIMER
          
                                   let start = new Date(obj.startDate).getTime();
                                   let end = new Date(obj.endDate).getTime();
                                   let startDate = new Date().getTime();
                                   let endDate = new Date().getTime() + end - start; 
                                   if(localStorage.getItem('endDate')===null && localStorage.getItem('endDate')===null)
                                   {
                                        localStorage.setItem('startDate' , startDate.toString());
                                        localStorage.setItem('endDate' , endDate.toString());
                                   }
                              }
                         })
                    }catch(err){
                        if(res.status=="error"){
                             try{
                                   if(res.result.errors[0].code=="unauthorized"){
                                        localStorage.setItem('status' , 401);
                                        alert('Please refresh your page or login')
                                   } 
                             }
                             finally{
                              alert('Please refresh your page or login');
                             }
                        }else{
                             alert('please refresh your page or try to login again')
                        }
                    }
               })
            });`;
          this.instance.appendChild(script);
     }
     anotherScript(){
          const script = document.createElement("script");
          script.async = true;
          script.innerHTML = `$(document).ready(function(){
               let contestList =  JSON.parse(localStorage.getItem('contestList'));
               let dataForAutoComplete = {};
               
// TODO : forEach makes async try to make it sync

               contestList.forEach( contest => {
                    dataForAutoComplete[contest.code] = null;
                    dataForAutoComplete[contest.name] = null;
               });
               $('input.autocomplete').autocomplete({
                    data: dataForAutoComplete,
                    // limit : 10
                    onAutocomplete : function(val){
                         let objName = contestList.find(o => o.name === val);
                         let objCode = contestList.find(o => o.code === val);
                         console.log(objName ,objCode );
                         let obj = {};
                         if(objName===undefined){
                              obj = objCode;
                         }else{
                              obj = objName;
                         }
                         localStorage.setItem('contestCode' , obj.code)
                         localStorage.setItem('contestDetails' , JSON.stringify(obj));   
                         // const contestDetails = JSON.parse(localStorage.getItem('contestDetails') ) ;
               
                    // SETUP FOR TIMER

                         let start = new Date(obj.startDate).getTime();
                         let end = new Date(obj.endDate).getTime();
                         let startDate = new Date().getTime();
                         let endDate = new Date().getTime() + end - start; 
                         if(localStorage.getItem('endDate')===null && localStorage.getItem('endDate')===null)
                         {
                              localStorage.setItem('startDate' , startDate.toString());
                              localStorage.setItem('endDate' , endDate.toString());
                         }
                    }
               });
            });`;
          this.instance.appendChild(script);
     }
     componentDidMount(){
          (async () => {
               if(localStorage.getItem('contestList')===null)
               await this.injectOnReadyScript();
               else{
                    this.anotherScript();
               }
          })();
          if(localStorage.getItem('status')===401){
               Utils.generateAccessToken();
          }
     }

     handleRegister = (e) => {
          let contestCode = localStorage.getItem('contestCode');
          if(contestCode===null){
               console.log(contestCode , 'invalide contest');
          }
          else{
               this.setState({
                    route : `${localStorage.getItem('contestCode')}/problems`,
               }, ()=> console.log(localStorage.getItem('contestCode')))
          }
     }

     render() {
          return (
               <div className="wrapper">
                    <NavBar/>
                    <div className="container">
                         <div className="row auto-search">
                              <div className="col s12">
                                   <div className="row">
                                        <div className="input-field col s8">
                                             <i className="material-icons prefix">search</i>
                                             <input type="text" autoComplete="off" placeholder="eg. COOK20A, COOKOFF MARCH 20" id="autocomplete-input" className="autocomplete"/>
                                             <label htmlFor="autocomplete-input" className="hide-on-small-only" >Contest Name or Contest Code</label>
                                        </div>
                                        <div className="input-field col s4 center">
                         {/* TODO : there may be a popup for starting contest  */}          
                                             <NavLink to='/problems' onClick={this.handleSubmit}  name="Submit" id="submit-btn"  className="btn waves-effect waves-light">Register</NavLink>     
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="terms">
                              <h4>Terms of agreement:</h4>
                                   <li>Virtual contest is a way to take part in past contest, as close as possible to participation on time. It is supported only ICPC mode for virtual contests.</li>
                                   <li>If you've seen these problems, a virtual contest is not for you - solve these problems in the archive.</li>
                                   <li>If you just want to solve some problem from a contest, a virtual contest is not for you - solve this problem in the archive.</li>
                                   <li>Never use someone else's code, read the tutorials or communicate with other person during a virtual contest.</li>
                         </div>
                    </div>
                    <div ref={el => (this.instance = el)}></div>
               </div>
          );
     }
}
