import React from 'react';

const Pagination = ({ ranksPerPage, totalRanks, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRanks / ranksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="teal" style={{width : '100%'}}>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number) } className='page-link waves-effect waves-light' >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;