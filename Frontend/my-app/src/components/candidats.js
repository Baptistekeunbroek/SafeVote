import axios from 'axios';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import './candidats.css';
import { Voter } from './voter';

export function Candidats() {
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
      .get('http://localhost:5000/getcandidats', {
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
    return <div>Loading...</div>;
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

      <Voter candidats={candidats} />
    </div>
  );
}

export default Candidats;
