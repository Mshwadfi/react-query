import React from 'react'
import { useQuery } from 'react-query'
import Shimmer from './Shimmer'

const RQquotes = () => {

  const {isLoading, data} = useQuery('Quotes', async()=>{
      const res = await fetch('http://localhost:4000/quotes')
      return res.json();
  })

  if(isLoading) return <Shimmer />
  return (
    <section>
      <h1 className='head'>React Query Quotes</h1>
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