import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Utils from '../../Utils/utils'

const SuccessfulSubmissions = ({ contestCode}) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      await axios.get(`https://api.codechef.com/submissions/?contestCode=${contestCode}`  , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
      .then(res =>{
        var data;
        try{
          data = res.data.result.data.content.slice( 0, Math.min(res.data.result.data.content.length , 10));
        }catch(e){
          data = []
        }
        setResults(data);
        setLoading(false);
      }).catch(err=>{
              try{
                if(err.response.status===401){
                    Utils.generateAccessToken();
                    alert('Some error occured...please refresh page')
                }
          }catch(e){
                alert('Some error occured...please refresh page or login')
                console.log(err)
          }
      });
    };
    fetchResults();
  }, []);

    const Results = results ? results.map(result=>{
      let {username} = result;
      
      return(
        <tr key={Math.random()}>
          <td ><a href={'https://www.codechef.com/users/' + result.username}>{username.length > 5 ? username.substring(0, 3) + "..." : username}</a></td>
          <td >{result.problemCode}</td>
          <td >{result.result}</td>
          <td >{result.language}</td>
        </tr>
      )
    }) : <h6 className="center">Fetching content...</h6>
    const List = loading===false ?
    <table className="highlight centered responsive-table" >       
      <thead>
        <tr>
            <th>User</th>
            <th>Problem</th>
            <th>Result</th>
            <th>Lanuage</th>
        </tr>
      </thead>
      <tbody>
        {Results}
      </tbody>
    </table> : <h6 className="center">Fetching content...</h6>
  return (
      <div className="results" style={{fontSize : 12}}>
        {List}
      </div>
  );
};

export default  SuccessfulSubmissions ;
