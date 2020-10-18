import React, { Component } from 'react'
import NavBar from '../common/navbar/nav';
import OngoingTimer from './OngoingTimer';
import { NavLink} from 'react-router-dom';
import axios from 'axios'
import Utils from '../utils/utils'
import MarkdownRender from '../markdown/markdownRender'
import SuccessfulSubmissions from './SuccessfulSubmissions/SuccessfulSubmissions';
import Preloader from '../common/Preloader/Preloader';
import './ProblemDiscription.css';

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
          contestCode : '',
          showIcon : 'add',
     }
     componentDidMount(){
          let problemCode = this.props.match.params.problemCode;
          let contestCode = this.props.match.params.contestCode;
          let path = `https://api.codechef.com/contests/${contestCode}/problems/${problemCode}`;
          axios.get( path , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
               .then(res=>{
                    const content = res.data.result.data.content;
                    // console.log(content , contestCode);
                    this.setState({
                         loading : false,
                         problemCode : content.problemCode,
                         problemName : content.problemName ,
                         author : content.author,
                         dateAdded : content.dateAdded ,
                         sourceSizeLimit : content.sourceSizeLimit,
                         maxTimeLimit : content.maxTimeLimit,
                         body : content.body,
                         contestCode : contestCode
                    } , ()=>{
                         this.setState({
                              loading : false
                         }) 
                    });     
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

          const {loading , problemCode, problemName , author , dateAdded , sourceSizeLimit , maxTimeLimit , contestCode , showIcon } = this.state;
          let showOutput ;
          let submitLink = `https://www.codechef.com/submit/${problemCode}`;
          if(loading){
               showOutput = <div style={{  position: 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)'}}><Preloader/></div> 
          }else{
               var data = this.state.body;
               data = data.replace(/`/g, "");
               data = data.replace(/###/g, "\n### ");
               data = data.replace(/<br ?\/?>/g, "\n");
               let renderProblemStatement = (
                    <MarkdownRender source={data} />
               );
               
              showOutput =  <div className="card-panel">
                              <div className="card-title">
                                   <div className="row valign-wrapper hide-on-small-only">
                                        <div className="col l4 left">
                                             <h2 style={{fontWeight :'500'}}>{problemName}</h2>
                                        </div>
                                        <div style={{fontWeight :'600'}} className="col l4 ">
                                   |  &nbsp; Problem Code : {problemCode}
                                        </div>
                                        <div className="col l4 center">
                                                  <NavLink style={{marginRight : 8}}   to={'/run/' + problemCode} className="btn waves-effect waves-light submit">
                                                       <i className="material-icons left hide-on-small-only">code</i>
                                                       RUN
                                                  </NavLink>
                                                  <a target="_blank" rel="noopener noreferrer"   href={submitLink} className="btn waves-effect waves-light submit">
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
                                             <NavLink style={{marginRight : 8}}  to={'/run/' + problemCode} className="btn waves-effect waves-light submit">
                                                  <i className="material-icons left hide-on-small-only">code</i>
                                                  RUN
                                             </NavLink>
                                             <a target="_blank" rel="noopener noreferrer"  href={submitLink} className="btn waves-effect waves-light">
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
                                        <div className="col l8 m12 s12 sub-container">
                                             <div className="problemDescription browser-default">
                                             { renderProblemStatement }
                                             </div>
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
                                                  <NavLink style={{marginRight : 20}}    to={'/run/' + problemCode} className="btn waves-effect waves-light submit">
                                                            <i className="material-icons left hide-on-small-only">code</i>
                                                            RUN
                                                  </NavLink>
                                                  <a target="_blank" rel="noopener noreferrer" href={submitLink} className="btn waves-effect waves-light submit">
                                                       <i className="material-icons left hide-on-small-only">send</i>
                                                       SUBMIT
                                                  </a>
                                                  
                                             </div>
                                        </div>
                    {/* SECOND COLUMN TIMER AND ALL */}
                                        <div className="col l4 m12 s12">
                                             <OngoingTimer/>
                                             <div className="card">
                                                  <div className="card-content">
                                                       <div className="card-title">
                                                            <strong>Recent Submissions</strong> 
                                                            <i style={{cursor : 'pointer'}} onClick={this.handleSubmissions} className="material-icons right grey-text">{showIcon}</i>
                                                       </div>
                                                       {showIcon==='close' ? <SuccessfulSubmissions problemCode={problemCode} contestCode={contestCode}/> : null}
                                                  </div> 
                                             </div>
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
