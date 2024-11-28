import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import Quotes from './components/Quotes';
import RQquotes from './components/RQquotes';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import Quote from './components/Quote';
import ParallelQueries from './components/ParallelQueries';
import DependantQueries from './components/DependantQueries';
import PaginateQueries from './components/PaginatedQueries';
import InfiniteQueries from './components/InfiniteQueries';
function App() {
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
       <Router>
          <div>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/quotes">Quotes</Link></li>
                <li><Link to="/rq-quotes">RQQuotes</Link></li>
              </ul>
            </nav>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/quotes' element={<Quotes />} />
              <Route path='/rq-quotes' element={<RQquotes />} />
              <Route path='/rq-quotes/:id' element={<Quote />} />
              <Route path='/parallel-queries' element={<ParallelQueries />} />
              <Route path='/dependent-queries' element={<DependantQueries id={'123456'}/>} />
              <Route path='paginated-queries' element={<PaginateQueries />} />
              <Route path='infinite-queries' element={<InfiniteQueries />} />
            </Routes>
            </div>
        </Router>
       <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
      </QueryClientProvider>
  );
}

export default App;
