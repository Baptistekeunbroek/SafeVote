import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function Sondage() {
  const [sondages, setSondages] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/getSondages')
      .then((res) => {
        setSondages(res.data.sondages);
        console.log(res.data.sondages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (sondages.length === 0) {
    return (
      <div className="sondageBig">
        <div className="sondage">
          <h1>Sondage</h1>
          <p>Aucun sondage</p>
          <Link to="/sondage/creer">
            <button type="button" className="button-31user">
              Creer un sondage
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sondageBig">
      <div className="sondage">
        <h1>Sondage</h1>
        <p>Voici les sondages disponibles :</p>
        <div className="sondageList">
          {sondages.map((sondage) => (
            <div className="sondageItem" key={sondage.idSondage}>
              <Link to={`/sondage/${sondage.idSondage}`}>
                <h2>{sondage.titre}</h2>
                <p>{sondage.descr}</p>
              </Link>
            </div>
          ))}
        </div>
        <Link to="/sondage/creer">
          <button type="button" className="button-31user">
            Creer un sondage
          </button>
        </Link>
      </div>
    </div>
  );
}
