import axios from 'axios';
import { useState, useEffect } from 'react';
import './register.css';
import DatePicker from 'react-date-picker';

export function Register() {
  const [passwordReg, setPasswordReg] = useState('');
  const [naissanceReg, setNaissanceReg] = useState(null);
  const [emailReg, setEmailReg] = useState('');
  const [nomReg, setNomReg] = useState('');
  const [prenomReg, setPrenomReg] = useState('');
  const [passwordConfirmReg, setPasswordConfirmReg] = useState('');
  const [datesend, setDatesend] = useState(null);

  const register = async () => {
    if (
      passwordReg === '' ||
      emailReg === '' ||
      naissanceReg === null ||
      nomReg === '' ||
      prenomReg === ''
    ) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    if (passwordReg !== passwordConfirmReg) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    await axios
      .post('http://localhost:5000/register', {
        email: emailReg,
        nom: nomReg,
        prenom: prenomReg,
        dateDeNaissance: datesend,
        password: passwordReg,
      })
      .then((res) => {
        console.log({ res: res });
        setPasswordReg('');
        setEmailReg('');
        setNomReg('');
        setPrenomReg('');
        setNaissanceReg(null);
        setPasswordConfirmReg('');
        setDatesend(null);
        alert('Inscription réussie');
      });
  };

  useEffect(() => {
    if (naissanceReg != null) {
      console.log(
        naissanceReg.getDate() +
          '-' +
          (naissanceReg.getMonth() * 1 + 1) +
          '-' +
          naissanceReg.getFullYear()
      );
      setDatesend(
        naissanceReg.getDate() +
          '-' +
          (naissanceReg.getMonth() * 1 + 1) +
          '-' +
          naissanceReg.getFullYear()
      );
    }
  }, [naissanceReg]);

  return (
    <div className="register">
      <input
        type="text"
        required
        placeholder="Nom"
        value={nomReg}
        onChange={(e) => setNomReg(e.target.value)}
      />
      <input
        type="text"
        required
        placeholder="Prenom"
        value={prenomReg}
        onChange={(e) => setPrenomReg(e.target.value)}
      />

      <div className="naissance">
        <label className="naissanceLabel">Date de Naissance</label>
        <DatePicker
          onChange={setNaissanceReg}
          value={naissanceReg}
          format="dd-MM-y"
        />
      </div>
      <input
        type="email"
        required
        placeholder="Email"
        value={emailReg}
        onChange={(e) => setEmailReg(e.target.value)}
      />
      <input
        type="password"
        required
        placeholder="Mot de passe"
        value={passwordReg}
        onChange={(e) => setPasswordReg(e.target.value)}
      />
      <input
        type="password"
        required
        placeholder="Confirmer mot de passe"
        value={passwordConfirmReg}
        onChange={(e) => setPasswordConfirmReg(e.target.value)}
      />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
