import React, { Component } from 'react'
import NavBar from '../common/navbar/nav';
import axios from 'axios';
import Utils from '../utils/utils';
import Preloader from '../common/Preloader/Preloader'
export default class User extends Component {
     state = {
          username : '',
          fullname : '',
          country : null,
          state : null,
          city : null,
          organization: null,
          occupation : null,
          globalRanking : null,
          countryRanking : null,
          rating : null,
          submissionStats: {},
          partiallySolved :{},
          solved : {},
          attempted : {},
          band : ''
     }
     componentDidMount(){
          axios.get( "https://api.codechef.com/users/me" , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
          .then(res=>{
               let data = res.data.result.data.content;
               // console.log(data);
               this.setState({
                    username : data.username,
                    fullname : data.fullname,
                    state : data.state? data.state.name : null,
                    city : data.city? data.city.name : null,
                    country : data.country ? data.country.name : null,
                    organization : data.organization ? data.organization : null,
                    occupation : data.occupation ? data.occupation : null,
                    globalRanking : data.rankings ? data.rankings.allContestRanking.global : null,
                    countryRanking : data.rankings ? data.rankings.allContestRanking.country : null, 
                    rating : data.ratings ? data.ratings.allContest : null,
                    band : data.band ? data.band : null,
                    partiallySolved : data.problemStats ? data.problemStats.partiallySolved : null,
                    solved : data.problemStats ? data.problemStats.solved : null,
                    attemped : data.problemStats ? data.problemStats.attemped : null,
                    submissionStats : data.submissionStats ? data.submissionStats : null
               } , ()=>this.createChart())
               localStorage.setItem('submissionStats' , JSON.stringify(data.submissionStats));
               localStorage.setItem('username' , data.username);
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
     createChart = ()=>{
          const script = document.createElement('script');
          script.async = true;
          script.innerHTML = `
          google.charts.load('current', {'packages':['corechart']});
          
          // Set a callback to run when the Google Visualization API is loaded.
          google.charts.setOnLoadCallback(drawChart);
      
          // Callback that creates and populates a data table, 
          // instantiates the pie chart, passes in the data and
          // draws it.
          function drawChart() {
          var submissionStats =JSON.parse(localStorage.getItem('submissionStats'));
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Submissions');
          data.addColumn('number', 'Type');
          data.addRows([
            ['Accepted Submissions', submissionStats.acceptedSubmissions],
            ['Wrong Submissions', submissionStats.wrongSubmissions],
            ['Runtime Error', submissionStats.runTimeError],
            ['Partially Solved', submissionStats.partiallySolvedSubmissions],
            ['Timelimit Exceed', submissionStats.timeLimitExceed],
            ['Comilation Error', submissionStats.compilationError],
          ]);
          var options = {
          //      'title':'SUBMISSIONS',
               slices: {
                    0: { color: 'green' },
                    1: { color: '#cf4d44' },
                    2: { color: 'brown' },
                    3: { color: '#d6a10f' },
                    4: { color: 'orange' },
                    5: { color: 'grey' }
               },
              legend:  {position: 'bottom', textStyle: {color: 'blue', fontSize: 10}}
              };
               var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
               chart.draw(data, options);
          }`;
           this.instance.appendChild(script);
     }
     render() {
          const {username , fullname , country ,state ,city ,organization ,globalRanking ,countryRanking ,
          rating,partiallySolved ,solved  , band } = this.state;

          let stars = [];
          let parsedBand = parseInt(band[0]);
          let colour = 'grey-text';
          if(parsedBand===2){
               colour = 'green-text';
          }else if(parsedBand===3){
               colour = 'blue-text text-darken-3';
          }else if(parsedBand===4){
               colour = 'indigo-text';
          }else if(parsedBand===5){
               colour = 'yellow-text';
          }else if(parsedBand===6){
               colour = 'orange-text';
          }else if(parsedBand > 6 ){
               colour = 'red-text';
          }
          while(parsedBand > 0){
               stars.push(parsedBand);
               parsedBand--;
          }
          var starsList = stars.map(star => {
               return (
                    <i className="material-icons"  key={star}>star</i>
               )
          });

          //fully solved
          const fullySolved =  
               Object.keys(solved).map((obj , i) => {
                    var arr = solved[obj];
                   var list =  arr.map(a=>{
                         return (
                              <li className="blue-text" key={a}>{a}</li>
                         )
                    })
                 return (
                   <div key={i}>
                    <strong>{obj} : </strong>
                    <p>{list}</p>
                   </div>
                 )})
           
          const partially  =  
          Object.keys(partiallySolved).map((obj , i) => {
               var arr = partiallySolved[obj];
               var list =  arr.map(a=>{
                    return (
                         <li className="blue-text" key={a}>{a}</li>
                    )
               })
          return (
               <div key={i}>
               <strong>{obj} : </strong>
               <p>{list}</p>
               </div>
          )})

          const userCard = username ? 
               <div className="card">
                    <div className="card-content">
                         <div className="card-title">
                              <h5><strong>{fullname}</strong></h5>
                         </div>
                         
                         <div className="divider grey darken-3"></div>
                         <div className="content">
                              <table>
                                   <tbody>
                                        <tr>
                                        <td>Username: </td>
                                        <td><span className={colour}>{band}</span>&nbsp;<a href={'https://www.codechef.com/users/' + username} rel="noopener noreferrer" target="_blank" style={{color : 'black'}} >{username}</a></td>
                                        </tr>
                                        <tr>
                                        <td>Country: </td>
                                        <td>{country}</td>
                                        </tr>
                                        <tr>
                                        <td>State: </td>
                                        <td>{state}</td>
                                        </tr>
                                        <tr>
                                        <td>City: </td>
                                        <td>{city}</td>
                                        </tr> 
                                        <tr>
                                        <td>Institution: </td>
                                        <td>{organization}</td>
                                        </tr>
                                   </tbody>
                              </table>
                         </div>
                         <div className="divider grey darken-1"></div>
                         <h5>Submissions</h5>
                         <div id="chart_div" style={{width : 600 , height : 600 }}></div>
                         <br/>
                         <div className="divider grey darken-2"></div>
                         <h5>Problem Solved</h5>
                         <strong><h6>Fully Solved</h6></strong>
                         {fullySolved}
                         <br/>
                         <div className="divider grey darken-2"></div>
                    
                         <strong><h6>Partially Solved</h6></strong>
                         {partially}
                    </div>
               </div>
          : <div style={{  position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'}}><Preloader/></div> ;



          // Raing CARD

      var ratingCard = countryRanking ?  <div className="card">
               <div className="card-content center">
                    <div className="card-title">
                         <strong><h3>{rating}</h3></strong>
                        <p><strong> Codechef Rating</strong></p> 
                        <div className={colour}>{starsList}</div> 
                    </div>
                    <div className="content">
                         <div>Global Rank: <strong>{globalRanking}</strong></div>
                         <div>Country Rank: <strong>{countryRanking}</strong> </div>
                    </div>
               </div>
          </div> : null;

          return (
               <div className="wrapper">
                    <NavBar/>
                    <div className="container">
                         <div className="row">
                              {ratingCard}
                              {userCard}
                         </div>
                    </div>
                    <div ref={el => (this.instance = el)}></div>
               </div>
          )
     }
}
