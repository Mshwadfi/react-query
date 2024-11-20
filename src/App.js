import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import Quotes from './components/Quotes';
import RQquotes from './components/RQquotes';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
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
            </Routes>
            </div>
        </Router>
       <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
      </QueryClientProvider>
  );
}

export default App;
