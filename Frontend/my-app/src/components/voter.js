import axios from 'axios';
import { useState, useEffect } from 'react';
import { MultiStepVote } from './multiStep';

export function Voter({ candidats }) {
  const [vote, setVote] = useState('');

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

  if (candidats.length === 0) {
    return (
      <div className="loading">
        <h1>Chargement...</h1>
      </div>
    );
  }

  return (
    <div className="voter">
      <h1 className="h1Voter">Voter</h1>
      <MultiStepVote candidats={candidats} />
    </div>
  );
}

export default Voter;
