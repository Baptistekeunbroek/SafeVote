import axios from 'axios';
import { useState, useEffect } from 'react';

export function Voter({ candidats }) {
  const [vote, setVote] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/checkVote', {
        withCredentials: true,
      })
      .then((res) => {
        setVote(res.data.vote);
        console.log(res.data.vote);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(candidats);
  }, []);

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
