import axios from 'axios';
import { useState, useEffect, React } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './candidats.css';
import { Voter } from './voter';

export function Candidats() {
  const location = useLocation();
  const [candidats, setCandidats] = useState([]);
  const navigate = useNavigate();

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
      .get(`http://localhost:5000${location.pathname}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCandidats(res.data.candidats);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (candidats.length === 0) {
    return (
      <div>
        <h1>Il n'y a aucun candidat dans cette liste !</h1>
        <Link to="/listes">
          <button type="button" className="button-31user">
            Retourner aux listes
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="candidats">
      <h1 className="h1Candidats">Liste des candidats</h1>
      <div className="candidatsTable">
        {candidats.map((candidat) => (
          <div className="candidat" key={candidat.idCandidat}>
            <img
              src={candidat.photo}
              alt="candidat"
              className="candidatPhoto"
            />
            <div className="candidatInfo">
              <h2 className="h2Candidat">
                {candidat.prenomC} {candidat.nomC}
              </h2>
              <p className="pCandidat">{candidat.partiPolitique}</p>
            </div>
          </div>
        ))}
      </div>

      <Voter />
    </div>
  );
}

export default Candidats;
