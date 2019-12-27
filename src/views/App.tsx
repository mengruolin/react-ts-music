import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  // console.log(1);
  
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log(1);
    
  }, [num])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {count},<button onClick={ () => {setCount(count + 1)} }>play.</button>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
