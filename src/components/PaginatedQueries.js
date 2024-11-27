import React, { useState } from 'react';
import { useQuery } from 'react-query';

const PaginateQueries = () => {
  const [page, setPage] = useState(1);
  
  const getScorers = async (page) => {
    const res = await fetch(`http://localhost:4000/topWorldCupScorers?_per_page=4&_page=${page}`);
    if (!res.ok) {
      throw new Error('Failed to fetch scorers');
    }
    return res.json();
  };
  
  const { data, isLoading, isError, error } = useQuery(['players', page], () => getScorers(page), {
    keepPreviousData: true,
  });

  // Extract total pages directly from the response
  const totalPages = data?.pages;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="player-cards">
        {data?.data?.map((player) => (
          <div key={player.id} className="card">
            <img
              src={player.imageUrl} 
              alt={player.name}
              className="player-image"
            />
            <div className="player-info">
              <div className="country">
                <img
                  src={player.countryFlagUrl} 
                  alt={player.country}
                  className="flag"
                />
                <span className="country-name">{player.country}</span>
              </div>
              <h2 className="player-name">{player.name}</h2>
              <p className="player-age">{player.age} years old</p>
              <p className="player-goals">{player.totalGoals} Goals</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-number">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages}  
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginateQueries;
