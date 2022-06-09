import axios from 'axios';
import { useState } from 'react';

export function Login() {
  const [usernameLog, setUsernameLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');

  const [data, setData] = useState('');

  const login = async () => {
    await axios
      .post('http://localhost:5000/login', {
        name: usernameLog,
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
    </div>
  );
}
