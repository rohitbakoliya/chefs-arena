import React, { Component } from 'react'
import NavBar from '../../common/navbar/nav';
import '../../ongoing/ProblemDiscription.css';
import MarkdownRender from '../../markdown/markdownRender'
import Timer from '../../timer/Timer';
import { NavLink} from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader'

export default class Problem extends Component {

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

          let problemsList =JSON.parse(localStorage.getItem('problemsList'));
          let content = problemsList.find(problem=>problem.problemCode === problemCode);
          // console.log(content)
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
               this.setState({loading: false});
          });
     }
     render() {

          const {loading , problemCode, problemName , author , dateAdded , sourceSizeLimit , maxTimeLimit } = this.state;
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
                                             <h5 style={{fontWeight :'500'}}>{problemName}</h5>
                                        </div>
                                        <div style={{fontWeight :'600'}} className="col l4 ">
                                   |  &nbsp; Problem Code : {problemCode}
                                        </div>
                                        <div className="col l4 center">
                                                  <NavLink style={{marginRight : 8}} disabled={localStorage.getItem('contestStatus')==='Contest has ended' || localStorage.getItem('contestStatus')==='Before start'}  to={'/run/' + problemCode} className="btn waves-effect waves-light submit">
                                                       <i className="material-icons left hide-on-small-only">code</i>
                                                       RUN
                                                  </NavLink>
                                                  <a rel="noopener noreferrer" target="_blank" disabled={localStorage.getItem('contestStatus')==='Contest has ended' || localStorage.getItem('contestStatus')==='Before start'}  href={submitLink} className="btn waves-effect waves-light submit">
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
                                             <NavLink style={{marginRight : 8}} disabled={localStorage.getItem('contestStatus')==='Contest has ended' || localStorage.getItem('contestStatus')==='Before start'}  to={'/run/' + problemCode} className="btn waves-effect waves-light submit">
                                                  <i className="material-icons left hide-on-small-only">code</i>
                                                  RUN
                                             </NavLink>
                                             <a rel="noopener noreferrer" target="_blank" disabled={localStorage.getItem('contestStatus')==='Contest has ended' || localStorage.getItem('contestStatus')==='Before start'} href={submitLink} className="btn waves-effect waves-light">
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
                                        <div className="col l8 m8 s12" style={{boxShadow:  '6px 0 2px -3px rgba(0,0,0,0.12)'}}>
                                             <div className="problemDescription">
                                                  {renderProblemStatement}
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
                                                  <NavLink style={{marginRight : 20}}  disabled={localStorage.getItem('contestStatus')==='Contest has ended' || localStorage.getItem('contestStatus')==='Before start'}  to={'/run/' + problemCode} className="btn waves-effect waves-light submit">
                                                            <i className="material-icons left hide-on-small-only">code</i>
                                                            RUN
                                                  </NavLink>
                                                  <a rel="noopener noreferrer" target="_blank" disabled={localStorage.getItem('contestStatus')==='Contest has ended' || localStorage.getItem('contestStatus')==='Before start'}  href={submitLink} className="btn waves-effect waves-light submit">
                                                       <i className="material-icons left hide-on-small-only">send</i>
                                                       SUBMIT
                                                  </a>
                                                  
                                             </div>
                                        </div>
                    {/* SECOND COLUMN TIMER AND ALL */}
                                        <div className="col l4 m4 s12">
                                             <Timer/>
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
