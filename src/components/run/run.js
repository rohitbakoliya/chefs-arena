import React from 'react';
import Editor from 'react-simple-code-editor';
import {highlight,  languages } from 'prismjs/components/prism-core';
import axios from 'axios';
import NavBar from '../navbar/nav';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-r';
import './prism.css';
import Utils from '../Utils/utils'
 
class Run extends React.Component {
  state = { 
     code : 
`#include <iostream>
using namespace std;

int main() {
     // your code goes here
     return 0;
}`,
     value : 'C++14',
     highlightLang :  languages.cpp,
     input : '',
     loading : false,
     time : '',
     cmpinfo : '',
     output : '',
     status : '',
     memory : '',
     stderr : ''
 };
 
  componentDidMount(){
     const script = document.createElement("script");
     script.async = true;
     script.innerHTML  = `$(document).ready(function(){
          $('select').formSelect();
          $('.modal').modal();
     });`
     this.instance.appendChild(script);
  }
  handleChange = (event)=> {
     this.setState({
          value: event.target.value,
     });
     if(event.target.value==='C++14'){
          this.setState({
               highlightLang : languages.cpp
          })       
     }
     else if(event.target.value==='PYTH'){
          this.setState({
               highlightLang : languages.python
          })
     }
     else if(event.target.value==='c'){
          this.setState({
               highlightLang : languages.c
          })
     }
     else if(event.target.value==='r'){
          this.setState({
               highlightLang : languages.r
          })
     }
     else if(event.target.value==='go'){
          this.setState({
               highlightLang : languages.go
          })
     }
     else if(event.target.value==='Java'){
          this.setState({
               highlightLang : languages.java
          })
     }

   }
   handleInput = (e)=>{
     this.setState({
          input : e.target.value
     })
   }
   handleRun = (e)=>{
     this.setState({
          loading : true
     });

     (async () => {
          let problem_config = {
               "sourceCode" : this.state.code,
               "language" : this.state.value,
               "input" : this.state.input, 
          }
          await axios.post("https://api.codechef.com/ide/run", problem_config ,  {headers : {"content-type" : "application/json", "Accept" :"application/json", "Authorization" : `Bearer ${localStorage.getItem('access_token')}`}})
          .then(async(res)=> {
               // console.log(res);
               let link = res.data.result.data.link;
              await axios.get(`https://api.codechef.com/ide/status?link=${link}` , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
               .then(res=>{
                    // console.log(res);
                    const data = res.data.result.data;
                    this.setState({
                         status : data.status,
                         output : data.output,
                         memory : data.memory,
                         stderr : data.stderr,
                         cmpinfo : data.cmpinfo,
                         date : data.date,
                         time : data.time,
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
          })
          .catch(err=> { 
               console.log(err);  
               if(err.response.status===401){
                    Utils.generateAccessToken();
               }else{
                    alert('Please...Try again')
               }
          }); 
     
     })();
   }


  render() {
     let op = this.state.loading ? <h5>Submission Queued...</h5> : this.state.status!=='' ?
          <div >
               <h4>OUTPUT</h4>
               <div className="row">
                    <div className="col l3">
                       <strong>Status :</strong> {this.state.status}
                    </div>
                    <div className="col l3">
                       <strong>Date :</strong> {this.state.date}
                    </div>
                    <div className="col l3">
                       <strong>Time :</strong> {this.state.time}sec 
                    </div>
                    <div className="col l3">
                       <strong>Mem :</strong> {this.state.memory}kB
                    </div>
                    
               </div>
               <div>     
                    {
                         this.state.stderr!==''  ? 
                         <p className="red-text">{this.state.stderr}</p>  : null
                    }
               </div>
               <div>
                    {
                         this.state.cmpinfo!=='' ? 
                         <div>
                              <strong>Compile Info :</strong>  
                                   <p className="red-text">{this.state.cmpinfo}</p>
                         </div>  : null
                    }
               </div>
               <div> {this.state.output!=='' ? <div>{this.state.output}</div>  : <div>No Output</div>}</div>
          </div>
     : null;

     return this.state.highlightLang ?  (
         <div className="wrapper">
              <NavBar/>
              <div className="container">
                    <div className="row valign-wrapper">
                         <div className="col l3">
                              <h4>IDE</h4>
                         </div>
                         <div className="col l6 center">
                              <div className="input-field col l5">
                              <select id="language" value={this.state.value} onChange={this.handleChange}>
                                   <option value="c">C</option>
                                   <option value="C++14">C++</option>
                                   <option value="Java">Java</option>
                                   <option value="PYTH">Python</option>
                                   <option value="go">Go</option>
                                   <option value="r">R</option>
                              </select>
                              </div>
                         </div>
                         <div className="col l3">
                              <a data-target="modal1" onClick={this.handleRun} className="btn waves-effect waves-light submit modal-trigger">
                                   <i className="material-icons left hide-on-small-only">code</i>
                                   RUN
                              </a>
                              {/* Model Structure */}
                              <div id="modal1" className="modal">
                                   <div className="modal-content">
                                        <h5>Solution has successfully submitted</h5>
                                   </div>
                                   <div className="modal-footer">
                                        <h5 className="modal-close waves-effect waves-green btn-flat">Okay</h5>
                                   </div>
                              </div>
                         </div>
                    </div>
                    
                    <Editor
                    value={this.state.code}
                    
                    placeholder="Type some code…"
                    onValueChange={code => this.setState({ code })}
                    highlight={code => highlight(code, this.state.highlightLang)}
                    padding={10}
                    style={{
                         fontFamily: '"Fira code", "Fira Mono", monospace',
                         fontSize: 12,
                         overflowWrap: 'break-word',
                         wordBreak:  'keep-all',
                         boxSizing: 'inherit',
                         display: 'inherit',
                         border : '2px solid teal',
                         borderRadius : 10,
                    }}
                    />
                    <br/>
                    <div className="row">
                         <div className="input-field col l6">
                              <textarea id="textarea1" className="materialize-textarea" onChange={this.handleInput}></textarea>
                              <label htmlFor="textarea1">Custom Test Case</label>
                         </div>
                    </div>
                    <div id="output">
                         {op}
                    </div>
                    <br/>
                    <br/>
                    <br/>
              </div>
               <div ref={el => (this.instance = el)}></div>
         </div>
    ) : null;
  }
}
export default Run; 