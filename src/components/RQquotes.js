import React from 'react'
import { useQuery } from 'react-query'
import Shimmer from './Shimmer'

const RQquotes = () => {

  const onSuccess = ()=>{
    console.log('perform Side Effect after data fetched correctly');
  }
  const onError = ()=>{
    console.log('perform Side Effect after data fetching fails');
  }

  const {isLoading, data, isError, error, refetch} = useQuery('Quotes', async()=>{
      const res = await fetch('http://localhost:4000/quotes')
      return res.json();
  },
  {
    // staleTime: 3000, // Data remains fresh for 3000ms (3 seconds) before becoming stale
    // refetchOnMount: true, // Refetches data when the component mounts "default"
    // refetchOnWindowFocus: true, // Refetches data when the window regains focus "default"
    // refetchInterval: 5000, // Automatically refetches data every 5000ms (5 seconds) - works only if the window is focuses
    // refetchIntervalInBackground: 2000, // Refetches data every 2000ms (2 seconds) even when the window is not focused
    // enabled: false, // Disables automatic fetching; must call refetch manually to fetch data
    onSuccess, //perform Side Effect after data fetched correctly
    onError,  //perform Side Effect after data fetching fails
    select: (data)=>{
      const quotes = data.map(quote => quote.quote)
      return quotes;
    }
  }
)
  // console.log(error)
  if(isLoading) return <Shimmer />
  if(isError) return <h2>{error.message}</h2>
  return (
    <section>
      <h1 className='head'>React Query Quotes</h1>
      <button onClick={refetch}>Load Quotes</button>
      <section className='quotes'>
      {/* {
        data?.map(quote => (
        <div key={quote.id} className='quote'>
         <h3 key={quote.id}>{quote.quote}</h3>
         <p>{quote.author}</p>
        </div>
      ))
      } */}
      {
        data.map(quote =>(
          <h1 key={quote}>{quote}</h1>
        ))
      }
    </section>
    </section>
  )
}

export default RQquotes