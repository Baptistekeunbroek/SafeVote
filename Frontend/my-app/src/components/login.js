import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Login() {
  function Home() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      axios
        .get('http://localhost:5000/checkAuthentication')
        .then((res) => {
          setLoggedIn(res.data.authenticated);
        })
        .catch((error) => {
          console.log(error);
          setLoggedIn(false);
        });
    }, []);

    return (
      <div>
        {loggedIn ? (
          <p>Login success</p>
        ) : (
          <div>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    );
  }

  const [usernameLog, setUsernameLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');

  const [data, setData] = useState('');

  const login = () => {
    axios
      .post('http://localhost:5000/login', {
        email: usernameLog,
        password: passwordLog,
      })
      .then((res) => {
        console.log({ res: res });
        setUsernameLog('');
        setPasswordLog('');
        setData(JSON.stringify(res.data));
      });
  };

  return (
    <div className="App">
      <div className="login">
        <input
          type="text"
          placeholder="Username"
          value={usernameLog}
          onChange={(e) => setUsernameLog(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={passwordLog}
          onChange={(e) => setPasswordLog(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
      {data}
      <Home />
    </div>
  );
}
