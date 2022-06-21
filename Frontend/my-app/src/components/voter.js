import axios from 'axios';
import { useState, useEffect } from 'react';
import { MultiStepVote } from './multiStep';

export function Voter({ candidats }) {
  const [vote, setVote] = useState('');
  const [choixVote, setChoixVote] = useState(1);

  useEffect(() => {
    axios
      .get('http://localhost:5000/checkVote', {
        withCredentials: true,
      })
      .then((res) => {
        setVote(res.data.vote);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function voter() {
    axios
      .post(
        'http://localhost:5000/vote',
        {
          idCandidat: choixVote,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (candidats.length === 0) {
    return (
      <div className="loading">
        <h1>Chargement...</h1>
      </div>
    );
  }

  if (vote.length === 0) {
    return (
      <div className="voter">
        <h1 className="h1Voter">Voter</h1>
        <MultiStepVote activeStep={1} candidats={candidats} />
      </div>
    );
  } else {
    return (
      <div className="voter">
        <h1 className="h1Voter">Vous avez déjà voté pour : </h1>
        <p className="nomVote">{candidats[vote[0].idCandidat - 1].nomC}</p>
        <p className="prenomVote">
          {candidats[vote[0].idCandidat - 1].prenomC}
        </p>
      </div>
    );
  }
}

export default Voter;
