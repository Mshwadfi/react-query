import React from 'react'
import { useQueries, useQuery } from 'react-query'
import { useDynamicParallelQueries } from '../hooks/useFetchQuotes'

const DynamicParallel = ({ids}) => {
    console.log(ids)
    let arr = [1,2,3]
    const data = useDynamicParallelQueries(arr);
    console.log('queries results: ',data);
  return (
    <section className='quotes'>{
      data?.map(query => (
        console.log('query', query),
        <div key={query.data.id} className='quote'>
         <h3 key={query.data.id}>{query.data?.quote}</h3>
         <p>{query.data.author}</p>
        </div>
      ))
    }</section>
  )
}

export default DynamicParallel