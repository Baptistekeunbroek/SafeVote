import axios from 'axios';
import { useEffect, React } from 'react';

export function StepVote({ changeState, vote }) {
  useEffect(() => {
    axios
      .post(
        'http://localhost:5000/vote',
        {
          idCandidat: vote.idCandidat,
        },
        { withCredentials: true }
      )
      .catch((error) => {
        console.log(error);
      });
  }, []); // eslint-disable-line
  return (
    <div className="StepVote">
      <h1>
        Vous avez voté pour {vote.prenomC}
        {vote.nomC}
      </h1>
      <button
        type="button"
        className="button-31"
        onClick={() => changeState(3)}
      >
        Récépissé
      </button>
    </div>
  );
}

export default StepVote;
