import axios from 'axios';
import { useState, useEffect, React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './userInfo.css';

export function UserInfo() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/checkAuthentication', {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.auth) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // eslint-disable-line

  useEffect(() => {
    axios
      .get('http://localhost:5000/getUser', {
        withCredentials: true,
      })
      .then((res) => {
        setEmail(res.data.email);
        setNom(res.data.nom);
        setPrenom(res.data.prenom);
        setTel(res.data.tel);
        setGenre(res.data.genre);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const logout = () => {
    axios.post('http://localhost:5000/logout', {}, { withCredentials: true });

    navigate('/login');
  };
  if (email === '' || nom === '' || prenom === '') {
    return (
      <div className="App">
        <p>LOADING</p>
      </div>
    );
  }
  return (
    <div className="App">
      <div className="Info">
        <h1 className="connected">Vous êtes connecté à votre compte</h1>
        <h3>
          Bonjour {genre} {prenom} {nom}{' '}
        </h3>
        <h3>Email : {email}</h3>
        <h3>Numéro de téléphone : {tel}</h3>
        <button
          type="button"
          className="button-31user width10"
          onClick={logout}
        >
          Se déconnecter
        </button>
        <Link to="/candidats">
          <button type="button" className="button-31user">
            Candidats
          </button>
        </Link>
      </div>
    </div>
  );
}
