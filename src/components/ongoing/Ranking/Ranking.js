import React, { useState, useEffect } from 'react';
import Ranks from './Ranks';
import Pagination from './Pagination';
import axios from 'axios';
import Utils from '../../Utils/utils'
import NavBar from '../../navbar/nav';
import Preloader from '../../Preloader/Preloader';

const Ranking = (props) => {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ranksPerPage] = useState(50);
  useEffect(() => {
    const fetchRanks = async () => {
      setLoading(true);
      await axios.get(`https://api.codechef.com/rankings/${localStorage.getItem('OngoingcontestCode')}`  , {headers : {"content-Type" : "application/json" ,"Authorization" : `Bearer ${localStorage.getItem('access_token')}` }})
      .then(res =>{
        // console.log(res.data.result.data.content);
        setRanks(res.data.result.data.content);
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

    fetchRanks();
  }, []);

  // Get current ranks
  const indexOfLastRank = currentPage * ranksPerPage;
  const indexOfFirstRank = indexOfLastRank - ranksPerPage;
  const currentRanks = ranks.slice(indexOfFirstRank, indexOfLastRank);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const page = loading===false ?<Pagination
      ranksPerPage={ranksPerPage}
      totalRanks={ranks.length}
      paginate={paginate}
    /> : null;

    const RankList = loading===false ?
    <table className="highlight centered responsive-table" >       
      <thead>
        <tr>
            <th>#</th>
            <th>Country</th>
            <th>Username</th>
            <th>Contest Score</th>
            <th>Penalty</th>
            <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        <Ranks ranks={currentRanks} loading={loading} />
      </tbody>
    </table> : null;

  const Card = loading===false ? <div className='card'>
      <div className="card-content">
        <div className="card-title">
          <h2>Ranks -{props.match.params.contestCode} </h2>
        </div>
          {RankList}
          {page}
          <br/>
      </div>
      </div> : <div style={{  position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'}}><Preloader/></div>
  return (
    <div className="wrapper">
      <NavBar/>
      <div className="container">
        {Card}
      </div>
    </div>
  );
};

export default Ranking;
