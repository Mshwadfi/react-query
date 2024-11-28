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

#### Using `useEffect` to fetch quotes:

```
const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  
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

```
##### what if we want to add Loading and error states?
we will assign 2 more state variables, and the code will be like this:

```
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
```
and to prevent the possibility of [race condition](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect) the code will become more complecated:
```
const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(()=>{
    let flag = true;
    fetchQuotes();
    if(flag) setIsloading(true);
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
```
#### using react query
React Query simplifies data fetching by using the useQuery hook. It abstracts away the complexities of dealing with the lifecycle of a fetch request, you can easily fetch `data`, handle `errors` and track `loading` state.

```
const Quotes = () => {

  const {isLoading, data, isError, error} = useQuery('Quotes', async()=>{
      const res = await fetch('http://localhost:4000/quotes')
      return res.json();
  })
  console.log(error)
  if(isLoading) return <Shimmer />
  if(isError) return <h2>{error.message}</h2>
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
```
## the useQuery hook
The useQuery hook is part of the React Query library and is used for fetching data asynchronously. It takes at least two parameters:

**1-Query Key (First Parameter)**

**2-Fetcher Function (Second Parameter)**

**3-Configuration Object (Optional third parameter, used for further customization)**
### Code Example
```
const fetchQuotes = async()=>{
    const res = await fetch('http://localhost:4000/quotes');
    return res.json();
  
}
const { isLoading, data, isError, error } = useQuery(
  'Quotes', //this is the unique key
   fetchQuotes, //this is the fetcher function
  {
      //this is the configration object(now it is empty but later we will add very interesting properties on it)
  }
)
```