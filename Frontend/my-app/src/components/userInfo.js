import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function UserInfo() {
  const navigate = useNavigate();
  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get('http://localhost:5000/checkAuthentication', {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.auth);
          if (!res.data.auth) {
            navigate('/login');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const logout = () => {
    axios
      .post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then((res) => {
        console.log({ res: res });
      });
  };
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

  return (
    <div className="App">
      <p>Connecté</p>
      <button onClick={logout}>Logout</button>

      <Home />
    </div>
  );
}
