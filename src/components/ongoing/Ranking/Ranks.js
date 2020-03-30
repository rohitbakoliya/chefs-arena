import React from 'react';

const Ranks = ({ ranks, loading }) => {
  if (loading) {
    return <h3 className="center">Loading...</h3>;
  }
  return (
      ranks.map(rank => {
        let totalScore =parseFloat(rank.totalScore) ;
        try{
          totalScore = totalScore.toFixed(2);
        }
        finally{
          return(
            <tr key={rank.username}>
              <td  >
                {rank.rank}
              </td>
              <td  >
                {rank.countryCode}
              </td>
              <td >
               <a href={"https://www.codechef.com/users/" + rank.username } target="_blank">{rank.username}</a> 
              </td>
              <td >
              {totalScore}
              </td>
              <td >
              {rank.penalty}
              </td>
              <td>
                {rank.rating}
              </td>
            </tr>
          )
        }
      })
  );
};

export default Ranks;