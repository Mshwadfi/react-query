import React from 'react'
import { useFetchPoetry, useFetchQuotes } from '../hooks/useFetchQuotes'

const ParallelQueries = () => {

    const {data: quotes} = useFetchQuotes();
    const {data: poetry} = useFetchPoetry();
    console.log('quotes', quotes)
  return (
    <>
    <h2>Quotes</h2>
        <section className='quotes'>{
      quotes?.map(quote => (
        <div key={quote?.id} className='quote'>
         <h3 key={quote?.id}>{quote?.quote}</h3>
         <p>{quote?.author}</p>
        </div>
      ))
    }</section>
    <h2>Poetry</h2>
    <section className='quotes'>{
      poetry?.map(line => (
        <div key={line.id} className='quote'>
         <h3 key={line.id}>{line.line}</h3>
         <p>{line.poet}</p>
        </div>
      ))
    }</section>
    </>
  )
}

export default ParallelQueries