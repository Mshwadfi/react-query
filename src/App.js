import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Quotes from './components/Quotes';
import RQquotes from './components/RQquotes';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <div>
            <nav>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/quotes">Quotes</a></li>
                <li><a href="/rq-quotes">RQQuotes</a></li>
              </ul>
            </nav>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/quotes' element={<Quotes />} />
              <Route path='/rq-quotes' element={<RQquotes />} />
            </Routes>
            </div>
        </Router>
      </QueryClientProvider>
  );
}

export default App;
