import React, { Fragment, useEffect, useState } from 'react'
import Shimmer from './Shimmer';


const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  
  useEffect(()=>{
    fetchQuotes();
    setIsloading(true);
  },[])

  const fetchQuotes = async()=>{
    const res = await fetch('http://localhost:4000/quotes');
    console.log('res', res);
    const data = await res.json();
    setQuotes(data);
    setIsloading(false);
  }
  console.log(quotes)

  if(isLoading) return <Shimmer />
  return (
    <section className='quotes'>{
      quotes.map(quote => (
        <div key={quote.id} className='quote'>
         <h3 key={quote.id}>{quote.quote}</h3>
         <p>{quote.author}</p>
        </div>
      ))
    }</section>
  )
}

export default Quotes