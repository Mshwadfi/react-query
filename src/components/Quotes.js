import React, { Fragment, useEffect, useState } from 'react'
import Shimmer from './Shimmer';


const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(()=>{
    fetchQuotes();
    setIsloading(true);
  },[])

  const fetchQuotes = async()=>{
    try {
      
      const res = await fetch('http://localhost:4000/quotes');
      const data = await res.json();
      setQuotes(data);
      setIsloading(false);
    } catch (error) {
      setError(error.message);
      setIsloading(false);
    }
  }
  console.log(error)

  if(isLoading) return <Shimmer />
  if(error) return <h2>{error}</h2>
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