import { MultiStepVote } from './multiStep';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Voter({ candidats }) {
  const [vote, setVote] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/checkVote', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.vote.length > 0) {
          setVote(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (candidats.length === 0) {
    return (
      <div className="loading">
        <h1>Chargement...</h1>
      </div>
    );
  }

  return (
    <div className="voter">
      {vote ? (
        <h1>Vous avez déjà voté</h1>
      ) : (
        <MultiStepVote candidats={candidats} />
      )}
      <p>Regardez vos mails pour voir votre vote</p>
    </div>
  );
}

export default Voter;
