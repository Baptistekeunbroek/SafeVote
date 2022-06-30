import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function AdminListe() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [checkAuthentication, setCheckAuthentication] = useState(false);
  function testPass() {
    axios
      .post(
        'http://localhost:5000/adminliste',
        { pass: password },
        { withCredentials: true }
      )
      .then((res) => {
        setCheckAuthentication(res.data.res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (checkAuthentication) {
      console.log(checkAuthentication);
      navigate('/adminliste/creerlistecandidat');
    }
  }, [checkAuthentication]);
  return (
    <div>
      <h1>Admin</h1>

      {checkAuthentication ? (
        <h1>Authentification réussie</h1>
      ) : (
        <>
          <input
            className="inputRegister fontBeau"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe administrateur"
          />
          <button type="button" className="button-31user" onClick={testPass}>
            Entrer
          </button>
        </>
      )}
    </div>
  );
}
