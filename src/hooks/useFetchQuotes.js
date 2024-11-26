import { useQuery, useQueries, useQueryClient } from "react-query"

const fetchQuotes = async()=> {
    const res = await fetch('http://localhost:4000/quotes')
    return res.json();
}
export const useFetchQuotes = ()=>{
    const data = useQuery('quotes', fetchQuotes,{
        staleTime: 3000,
        // enabled: false,
        // select: (data) =>{
        //     const quotes = data.map(quote => quote.quote)
        //     return quotes;
        // }
    })
    return data;
}

const fetchSingleQuote = async(id)=>{
    const res = await fetch(`http://localhost:4000/quotes/${id}`)
    return res.json();
}

export const useFetchSingleQuote = (id)=>{
    const data = useQuery(['single-quote', id], ()=>fetchSingleQuote(id),{
        staleTime: 3000,
    })
    return data;
}

const fetchPoetry = async()=>{
    const res = await fetch('http://localhost:4000/poetry');
    return res.json();
}

export const useFetchPoetry = ()=>{
    const data = useQuery('poetry', fetchPoetry);
    return data;
}

export const useDynamicParallelQueries = (ids)=>{
    console.log('recieved ids: ',ids)
    const queryResults = useQueries(
        ids?.map(id => {
            return {
                queryKey: ['single-quote', id],
                queryFn: ()=> fetchSingleQuote(id),
            }
        })
    )
    return queryResults;
}

export const useFetchQuoteWithInitialQueryData = (id) => {
    const queryClient = useQueryClient();

    return useQuery(
        ['single-quote', id],
        () => fetchSingleQuote(id), 
        {
            initialData: () => {
                const cachedData = queryClient.getQueryData('quotes'); // Fetch cached data for the 'quotes' query
                if (cachedData) {
                    const quote = cachedData.find((quote) => parseInt(quote.id) === parseInt(id)); // Find the quote by id
                    if (quote) {
                        console.log('cached quote',quote);
                        return quote; // Directly return the quote if found
                    }
                }
                return undefined; // Return undefined if no initial data is available
            },
            staleTime: 30000,
        }
    );
};
