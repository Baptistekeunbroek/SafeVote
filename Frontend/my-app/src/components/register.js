import axios from 'axios';
import { useState, useEffect } from 'react';
import './register.css';
import DatePicker from 'react-date-picker';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export function Register() {
  const [naissanceReg, setNaissanceReg] = useState(null);
  const [datesend, setDatesend] = useState(null);
  const [data, setData] = useState('');
  const formSchema = Yup.object().shape({
    mdp: Yup.string()
      .required('Un mot de passe est requis')
      .min(4, 'Le mot de passe fait au moins 4 caractères')
      .max(12, 'Le mot de passe fait ne doit pas faire plus de 12 caractères'),
    mdpVerif: Yup.string()
      .required('La confirmation du mot de passe est requis')
      .oneOf([Yup.ref('mdp')], 'Les mots de passes sont différents'),
    Prenom: Yup.string().required('Un prenom est requis'),
    Nom: Yup.string().required('Un nom est requis'),
    Email: Yup.string().required('un email est requis').email('Email invalide'),
    Tel: Yup.string()
      .required('Le téléphone est requis')
      .matches(/^\d{10}$/, 'Le numéro de téléphone doit contenir 10 chiffres'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
  });
  const onSubmit = (data) => setData(data);
  console.log(errors);
  const navigate = useNavigate();

  const registerr = async () => {
    if (naissanceReg === null) {
      return;
    }
    await axios
      .post('http://localhost:5000/register', {
        email: data.Email,
        nom: data.Nom,
        prenom: data.Prenom,
        dateDeNaissance: datesend,
        password: data.mdp,
        tel: data.Tel,
        genre: data.Genre,
      })
      .then((res) => {
        console.log({ res: res });
        setNaissanceReg(null);
        setDatesend(null);
        alert('Inscription réussie');
        setData('');
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
      <h1>Créer un compte</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="register">
        <select {...register('Genre', { required: true })}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mme</option>
          <option value="Miss">Autre</option>
        </select>

        <input type="text" placeholder="Prenom" {...register('Prenom')} />
        {errors.Prenom && <p className="errorLogin">{errors.Prenom.message}</p>}

        <input type="text" placeholder="Nom" {...register('Nom')} />
        {errors.Nom && <p className="errorLogin">{errors.Nom.message}</p>}

        <input type="text" placeholder="Email" {...register('Email')} />
        {errors.Email && <p className="errorLogin">{errors.Email.message}</p>}

        <input type="tel" placeholder="Téléphone" {...register('Tel')} />
        {errors.Tel && <p className="errorLogin">{errors.Tel.message}</p>}

        <DatePicker
          onChange={setNaissanceReg}
          value={naissanceReg}
          format="dd-MM-y"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          {...register('mdp')}
        />
        {errors.mdp && <p className="errorLogin">{errors.mdp.message}</p>}
        <input
          type="password"
          placeholder="Répétez le mot de passe"
          {...register('mdpVerif')}
        />
        {errors.mdpVerif && (
          <p className="errorLogin">{errors.mdpVerif.message}</p>
        )}

        <input type="submit" placeholder="S'inscrire" onClick={registerr} />
      </form>
      <p>Vous avez déjà un compte? Connetez vous !</p>
      <button onClick={() => navigate('/login')}>Se connecter</button>
    </div>
  );
}

export default Register;
