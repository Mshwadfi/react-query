import React from 'react'
import { useQuery } from 'react-query'
import Shimmer from './Shimmer'

const RQquotes = () => {

  const {isLoading, data, isError, error, refetch} = useQuery('Quotes', async()=>{
      const res = await fetch('http://localhost:4000/quotes')
      return res.json();
  },
  {
    // enabled: false,
  }
)
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
         <h3 key={quote.id}>{quote.quote}</h3>
         <p>{quote.author}</p>
        </div>
      ))
      }
    </section>
    </section>
  )
}

export default RQquotes