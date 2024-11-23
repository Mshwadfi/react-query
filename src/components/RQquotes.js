import React from 'react'
import { useQuery } from 'react-query'
import Shimmer from './Shimmer'
import { useFetchQuotes } from '../hooks/useFetchQuotes'
import { Link } from 'react-router-dom'

const RQquotes = () => {

  const onSuccess = ()=>{
    console.log('perform Side Effect after data fetched correctly');
  }
  const onError = ()=>{
    console.log('perform Side Effect after data fetching fails');
  }

  const {isLoading, data, isError, error, refetch} = useFetchQuotes();
  console.log(data)
  
  console.log(error)
  if(isLoading) return <Shimmer />
  if(isError) return <h2>{error.message}</h2>
  return (
    <section>
      <h1 className='head'>React Query Quotes</h1>
      <button onClick={refetch}>Load Quotes</button>
      <section className='quotes'>
      {
        data?.map(quote => (
        <div key={quote.id} className='quote'>
         <Link to={`/rq-quotes/${quote.id}`}><h3 key={quote.id}>{quote.quote}</h3></Link>
         <p>{quote.author}</p>
        </div>
      ))
      }
      {/* {
        data?.map(quote =>(
          <h1 key={quote}>{quote}</h1>
        ))
      } */}
    </section>
    </section>
  )
}

export default RQquotes