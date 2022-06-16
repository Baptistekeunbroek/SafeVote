import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
  const [usernameLog, setUsernameLog] = useState('');
  const [passwordLog, setPasswordLog] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/checkAuthentication', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.auth);
        if (res.data.auth) {
          navigate('/userInfo');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // const [data, setData] = useState('');

  const login = () => {
    axios
      .post(
        'http://localhost:5000/login',
        {
          email: usernameLog,
          password: passwordLog,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log({ res: res });
        setUsernameLog('');
        setPasswordLog('');

        if (res.data === true) {
          navigate('/userInfo');
        }
      });
  };

  return (
    <div className="App">
      <h1 className="h1Login">Connexion</h1>
      <div className="login flexColumn">
        <input
          className="inputLogin"
          type="text"
          placeholder="Username"
          value={usernameLog}
          onChange={(e) => setUsernameLog(e.target.value)}
        />
        <input
          className="inputLogin"
          type="password"
          placeholder="Password"
          value={passwordLog}
          onChange={(e) => setPasswordLog(e.target.value)}
        />
        <button className="button-31" onClick={login}>
          Connexion
        </button>
      </div>
      <p className="pLogin">
        Vous n'avez pas encore créé de compte? faite en un maintenant !
      </p>
      <button
        className="button-31 width10"
        onClick={() => navigate('/register')}
      >
        Créer un compte
      </button>
    </div>
  );
}
