import React from 'react'
import { useInfiniteQuery } from 'react-query';

const InfiniteQueries = () => {

    const fetchPlayers = async({pageParam = 1})=>{
        const res = await fetch(`http://localhost:4000/topWorldCupScorers?_page=${pageParam}&_per_page=4`);
        return res.json();
    }

    const {isLoading, data, isError, error, hasNextPage, fetchNextPage} = useInfiniteQuery('players', fetchPlayers,{
        getNextPageParam: (_lastPage, pages)=>{
            if(pages.length < 4){
                return pages.length + 1;
            }else{
                return undefined;
            }
        }
    })
    if(isLoading) return <h1>loading...</h1>
    if(isError) return <h1>{error}</h1>
    console.log(data.pages);
  return (
    <div className="container">
    <div className="player-cards">
      {data?.pages?.map((players) => (
        players?.data?.map(player=>(
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
        ))
      ))}
    </div>

   
      {hasNextPage && <button
        onClick={fetchNextPage}
        className="pagination-button"
      >
        Load More
      </button>}
    
  </div>
  )
}

export default InfiniteQueries