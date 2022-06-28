import axios from 'axios';
import { useEffect, React } from 'react';

export function StepResultat({ vote }) {
  useEffect(() => {
    if (vote) {
      axios
        .post(
          'http://localhost:5000/sendConfirmationEmail',
          { vote: vote },
          { withCredentials: true }
        )
        .catch((error) => {
          console.log(error);
        });
    }
  }, [vote]);
  return (
    <div className="StepResultat">
      <h1>Vous avez voté ! </h1>
      <p>Vous aller recevoir votre confirmation par email ! </p>
    </div>
  );
}
