# React Query

React Query is a powerful library that simplifies data fetching, caching, synchronization, and state management for server-state in React applications. It provides hooks like `useQuery` and `useMutation` to handle asynchronous operations seamlessly. Here’s why you should consider using React Query and how it compares to traditional approaches like `useEffect`.

## Why React Query

React Query abstracts away complex data-fetching logic, including caching, pagination, background data updates, and automatic retries, making your code cleaner and more efficient. It focuses on server-state, such as fetching data, managing loading, error handling, and synchronization between the server and UI.

### Benefits:
- **Automatic caching**: React Query automatically caches data and manages cache invalidation.
- **Background refetching**: It can automatically refetch data in the background when the user revisits a component.
- **Optimistic updates**: You can implement optimistic updates to give your app a snappy, responsive feel.
- **Error handling**: Built-in error handling that helps simplify UI states based on the data-fetching result.

---

## React Query vs `useEffect`

When fetching data with `useEffect`, you often need to manually manage loading and error states, along with data caching. React Query, on the other hand, automatically handles these concerns.

### Example: Fetching data with `useEffect` vs React Query

#### Using `useEffect`

```jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuotesWithUseEffect = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/quotes')
      .then(res => res.json())
      .then(data => {
        setQuotes(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <h1>Quotes</h1>
      <div className='quotes'>
        {quotes.map(quote => (
          <div key={quote.id} className='quote'>
            <Link to={`/quotes/${quote.id}`}><h3>{quote.quote}</h3></Link>
            <p>{quote.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuotesWithUseEffect;
