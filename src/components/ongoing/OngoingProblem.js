import React, { Component } from 'react'
import NavBar from '../navbar/nav';
import convertToHTML from 'markdown-to-html-converter';
import '../problems/Problem.css';
import OngoingTimer from './OngoingTimer';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import Utils from '../Utils/utils'

export default class OngoingProblem extends Component {

     state = {
          loading : true,
          problemCode : '',
          problemName : '',
          author : '',
          dateAdded : '',
          sourceSizeLimit : '',
          maxTimeLimit : '',
          body : '',
     }
     componentDidMount(){
          let problemCode = this.props.match.params.problemCode;
          let contestCode = this.props.match.params.contestCode;
          let path = `https://api.codechef.com/contests/${contestCode}/problems/${problemCode}`;
          axios.get( path , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
               .then(res=>{
                    const content = res.data.result.data.content;
                    console.log(content);
                    this.setState({
                         loading : false,
                         problemCode : content.problemCode,
                         problemName : content.problemName ,
                         author : content.author,
                         dateAdded : content.dateAdded ,
                         sourceSizeLimit : content.sourceSizeLimit,
                         maxTimeLimit : content.maxTimeLimit,
                         body : content.body,
                    } , ()=>{
                         
                         let body = this.state.body;
                         body = body.replace(/<br ?\/?>/g, "\n");
                         // TODO : use mathjax instead of this
                         body = body.replace(/\\le/g , "&lt;");
                         const markdownStr = body;
                         const htmlStr = convertToHTML(markdownStr);
                         document.getElementById('body').innerHTML = htmlStr;
                         this.setState({
                              loading : false
                         }) 
                    });     
          }).catch(err=> {
               try{
                    if(err.response.status==401){
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

          const {loading , problemCode, problemName , author , dateAdded , sourceSizeLimit , maxTimeLimit ,body} = this.state;
          let showOutput ;
          let submitLink = `https://www.codechef.com/submit/${problemCode}`;
          if(loading){
               showOutput = <h4 className="center">Loading...</h4>
          }else{
              showOutput =  <div className="card-panel">
                              <div className="card-title">
                                   <div className="row valign-wrapper hide-on-small-only">
                                        <div className="col l4 left">
                                             <h5 style={{fontWeight :'500'}}>{problemName}</h5>
                                        </div>
                                        <div style={{fontWeight :'600'}} className="col l4 ">
                                   |  &nbsp; Problem Code : {problemCode}
                                        </div>
                                        <div className="col l4 center">
                                                  <a style={{marginRight : 8}} disabled={localStorage.getItem('contestStatus')==='Contest has ended' || localStorage.getItem('contestStatus')==='Before start'}  href={'/run/' + problemCode} className="btn waves-effect waves-light submit">
                                                       <i className="material-icons left hide-on-small-only">code</i>
                                                       RUN
                                                  </a>
                                                  <a target="_blank" disabled={localStorage.getItem('contestStatus')==='Contest has ended' || localStorage.getItem('contestStatus')==='Before start'}  href={submitLink} className="btn waves-effect waves-light submit">
                                                       <i className="material-icons left hide-on-small-only">send</i>
                                                       SUBMIT
                                                  </a>
                                        </div>
                                   </div>
                                   <div className="row hide-on-med-and-up">
                                        <div className="col l4 s12">
                                             <h5 style={{fontWeight :'500'}}>{problemName}</h5>
                                        </div>
                                        <div style={{fontWeight :'600'}} className="col l4 s12">
                                      Problem Code : {problemCode}
                                        </div>
                                        <div style={{marginTop : 10}} className="col l4 s12 center">
                                             <a style={{marginRight : 8}} disabled={localStorage.getItem('contestStatus')==='Contest has ended' || localStorage.getItem('contestStatus')==='Before start'}  href={'/run/' + problemCode} className="btn waves-effect waves-light submit">
                                                  <i className="material-icons left hide-on-small-only">code</i>
                                                  RUN
                                             </a>
                                             <a target="_blank" disabled={localStorage.getItem('contestStatus')==='Contest has ended' || localStorage.getItem('contestStatus')==='Before start'} href={submitLink} className="btn waves-effect waves-light">
                                                  <i className="material-icons left  hide-on-small-only">send</i>
                                                  SUBMIT
                                             </a>
                                        </div>
                                   </div>
                              </div>
                              <div className="divider grey darken-1"></div>
                              <br/>
                              <div className="card-content">
                                   <div className="row">
                                        <div className="col l8 m8 s12 sub-container">
                                             <div id="body" className="browser-default"></div>
                                             <table className="responsive-table striped grey lighten-3 centered">
                                                  <tbody>
                                                       <tr>
                                                       <td>Author</td>
                                                       <td className="red-text text-darken-2">{author}</td>
                                                       </tr>
                                                       <tr>
                                                       <td>Date Added</td>
                                                       <td>{dateAdded}</td>
                                                       </tr>
                                                       <tr>
                                                       <td>Time Limit</td>
                                                       <td>{maxTimeLimit}</td>
                                                       </tr>
                                                       <tr>
                                                       <td>Source Limit</td>
                                                       <td>{sourceSizeLimit}</td>
                                                       </tr>
                                                  </tbody>
                                             </table>
                                             <br/>
                                             <div className="divider grey darken-2"></div>
                                             <br/>
                                             <div className="submit-btn center-align">
                                                  <a style={{marginRight : 20}}  disabled={localStorage.getItem('contestStatus')==='Contest has ended' || localStorage.getItem('contestStatus')==='Before start'}  href={submitLink} className="btn waves-effect waves-light submit">
                                                            <i className="material-icons left hide-on-small-only">code</i>
                                                            RUN
                                                  </a>
                                                  <a target="_blank" disabled={localStorage.getItem('contestStatus')==='Contest has ended' || localStorage.getItem('contestStatus')==='Before start'}  href={submitLink} className="btn waves-effect waves-light submit">
                                                       <i className="material-icons left hide-on-small-only">send</i>
                                                       SUBMIT
                                                  </a>
                                                  
                                             </div>
                                        </div>
                    {/* SECOND COLUMN TIMER AND ALL */}
                                        <div className="col l4 m4 s12">
                                             <OngoingTimer/>
                                             <div className="card">current submissions</div>
                                        </div>
                                   </div>
                              </div>
                         </div>
          }

          return (
               <div className="wrapper">
                    <NavBar/>
                    <div className="container">
                         {showOutput}
                    </div>
               </div>
          )
     }
}
