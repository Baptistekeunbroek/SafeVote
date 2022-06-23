import axios from 'axios';
import { useEffect } from 'react';
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
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="StepVote">
      <h1>
        Vous avez voté pour {vote.prenomC}
        {vote.nomC}
      </h1>
      <button className="button-31" onClick={() => changeState(3)}>
        Récépissé
      </button>
    </div>
  );
}

export default StepVote;
