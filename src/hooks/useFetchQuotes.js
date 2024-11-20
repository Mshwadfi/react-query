import { useQuery } from "react-query"

const fetchQuotes = async()=> {
    const res = await fetch('http://localhost:4000/quotes')
    return res.json();
}
export const useFetchQuotes = ()=>{
    const data = useQuery('quotes', fetchQuotes,{
        staleTime: 3000,
        enabled: false,
        // select: (data) =>{
        //     const quotes = data.map(quote => quote.quote)
        //     return quotes;
        // }
    })
    return data;
}