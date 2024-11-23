import React from 'react'
import { useFetchSingleQuote } from '../hooks/useFetchQuotes'
import { useParams } from 'react-router-dom';

const Quote = () => {
    let {id} = useParams();
    const {data, isLoading, isError, error} = useFetchSingleQuote(id);
    console.log('single Quote',data);

    if(isLoading) return <h2>Loading...</h2>
    if(isError) return error
  return (
    <section>
      <div key={data.id} className='quote'>
         <h3 key={data.id}>{data.quote}</h3>
         <p>{data.author}</p>
        </div>
    </section>
  )
}

export default Quote