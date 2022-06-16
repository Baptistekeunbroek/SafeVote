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
    Email: Yup.string().required('Un email est requis').email('Email invalide'),
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
      <h1 className="h1Register">Créer un compte</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="register">
        <select {...register('Genre', { required: true })}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mme</option>
          <option value="Miss">Autre</option>
        </select>
        <div className="flexRow">
          <div className="flexColumn">
            <input
              type="text"
              className="inputRegister"
              placeholder="Prenom"
              {...register('Prenom')}
            />
            {errors.Prenom && (
              <p className="errorRegister">{errors.Prenom.message}</p>
            )}
          </div>

          <div className="flexColumn">
            <input
              type="text"
              className="inputRegister"
              placeholder="Nom"
              {...register('Nom')}
            />
            {errors.Nom && (
              <p className="errorRegister">{errors.Nom.message}</p>
            )}
          </div>
        </div>

        <input
          type="text"
          className="inputRegister"
          placeholder="Email"
          {...register('Email')}
        />
        {errors.Email && (
          <p className="errorRegister">{errors.Email.message}</p>
        )}

        <input
          type="tel"
          className="inputRegister"
          placeholder="Téléphone"
          {...register('Tel')}
        />
        {errors.Tel && <p className="errorRegister">{errors.Tel.message}</p>}
        <p className="Datepicker">Date de naissance</p>
        <DatePicker
          onChange={setNaissanceReg}
          value={naissanceReg}
          format="dd-MM-y"
          clearIcon={null}
          calendarIcon={null}
          customStyles={{ dateInput: { borderWidth: 0 } }}
        />

        <input
          className="inputRegister"
          type="password"
          placeholder="Mot de passe"
          {...register('mdp')}
        />
        {errors.mdp && <p className="errorRegister">{errors.mdp.message}</p>}
        <input
          className="inputRegister"
          type="password"
          placeholder="Répétez le mot de passe"
          {...register('mdpVerif')}
        />
        {errors.mdpVerif && (
          <p className="errorRegister">{errors.mdpVerif.message}</p>
        )}

        <button type="submit" className="button-31" onClick={registerr}>
          Inscription
        </button>
      </form>
      <p className="pRegister">Vous avez déjà un compte? Connetez vous !</p>
      <button className="button-31" onClick={() => navigate('/login')}>
        Se connecter
      </button>
    </div>
  );
}

export default Register;
