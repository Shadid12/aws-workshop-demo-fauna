import { useState } from 'react';
import './App.css';


function App() {

  const [isLoading, setIsLoading] = useState(false);

  const success = () => {
    setIsLoading(true);
  }

  const fails = () => {
    setIsLoading(true);
  }

  return (
    <div >
      <div className="container">
        <h1>Click on a button for the serverless functions to execute</h1>
        <>
          <button 
            className="button is-success" 
            onClick={success}
            disabled={isLoading}
          >
            Success Scenario
          </button>
          <button 
            className="button is-danger" 
            onClick={fails}
            disabled={isLoading}
          >
            Fail Scenario
          </button>
        </>
        {
          isLoading && <progress class="progress is-primary" max="100">30%</progress>
        }
      </div>
    </div>
  );
}

export default App;
