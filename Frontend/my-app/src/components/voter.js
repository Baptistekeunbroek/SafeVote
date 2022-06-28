import axios from 'axios';
import { useEffect, useState, React } from 'react';
import { MultiStepVote } from './multiStep';
import './voter.css';

export function Voter({ candidats }) {
  const [vote, setVote] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/checkVote', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.vote.length > 0) {
          setVote(true);
        } else {
          setVote(false);
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
        <div className="dejaVoterBig">
          <div className="dejaVoter">
            <h1>Vous avez déjà voté</h1>
            <p>Regardez vos mails pour voir votre vote</p>
          </div>
        </div>
      ) : (
        <MultiStepVote candidats={candidats} />
      )}
    </div>
  );
}

export default Voter;
