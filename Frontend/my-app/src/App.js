import logo from './logo.svg';
import './App.css';

import axios from 'axios';

function App() {
  const register = async () => {
    const { data } = await axios
      .post('http://localhost:5000/register', {
        name: 'John',
        password: '123456',
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
      <button onClick={register}>Register</button>
    </div>
  );
}

export default App;
