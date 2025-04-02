import { useNavigate } from 'react-router';
import './App.css';
import { AppRouter } from './components/AppRouter';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

function App() {
  const navigate = useNavigate();

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <h1 className="App_title" onClick={() => navigate('/')}>
            Test Task
          </h1>
        </header>
        <AppRouter />
      </div>
    </ErrorBoundary>
  );
}

export default App;
