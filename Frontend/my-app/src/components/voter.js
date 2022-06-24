import axios from 'axios';
import { useEffect, useState, React } from 'react';
import { MultiStepVote } from './multiStep';

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
  console.log(vote);

  return (
    <div className="voter">
      {vote ? (
        <div>
          <h1>Vous avez déjà voté</h1>
          <p>Regardez vos mails pour voir votre vote</p>
        </div>
      ) : (
        <MultiStepVote candidats={candidats} />
      )}
    </div>
  );
}

export default Voter;
