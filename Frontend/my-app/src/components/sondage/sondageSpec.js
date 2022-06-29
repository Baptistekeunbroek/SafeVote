import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function SondageSpec() {
  const [sondage, setSondage] = useState([]);
  const [voteSondage, setVoteSondage] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:5000/getSondage/${id}`)
      .then((res) => {
        console.log(res.data.sondage[0]);
        setSondage(res.data.sondage[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function soumettreVote() {
    axios
      .post(
        `http://localhost:5000/voteSondage/${id}`,
        {
          vote: voteSondage,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setVoteSondage(1);
      });
  }

  if (sondage.length === 0) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="sondageBig">
      <div className="sondage">
        <h1>Sondage</h1>
        <div className="sondageItem">
          <h2>{sondage.titre}</h2>
          <p>{sondage.descr}</p>
          <div className="flexRow">
            <button
              type="button"
              onClick={() => setVoteSondage(1)}
              className="button-31user"
            >
              {sondage.option1}
            </button>
            <button
              type="button"
              onClick={() => setVoteSondage(2)}
              className="button-31user"
            >
              {sondage.option2}
            </button>
          </div>
          <div className="flexRow">
            {sondage.option3 !== 'undefined' && (
              <button
                type="button"
                onClick={() => setVoteSondage(3)}
                className="button-31user"
              >
                {sondage.option3}
              </button>
            )}
            {sondage.option4 !== 'undefined' && (
              <button
                onClick={() => setVoteSondage(4)}
                type="button"
                className="button-31user"
              >
                {sondage.option4}
              </button>
            )}
          </div>
        </div>
        <button type="button" className="button-31user" onClick={soumettreVote}>
          Soumettre
        </button>
      </div>
    </div>
  );
}
