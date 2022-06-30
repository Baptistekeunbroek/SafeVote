import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './listes.css';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

export function Listes() {
  const [listes, setListes] = useState([]);
  const [candidats, setCandidats] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/listes')
      .then((res) => {
        setListes(res.data.listes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (listes.length === 0) {
      return;
    }
    for (let i = 0; i < listes.length; i += 1) {
      axios
        .get('http://localhost:5000/candidats')
        .then((res) => {
          setCandidats(res.data.candidats);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [listes]);

  if (listes.length === 0 || candidats.length === 0) {
    return <div>Chargement...</div>;
  }
  return (
    <div className="ListesBig">
      <h1>Listes</h1>
      <div className="Listes">
        {listes.map((liste) => (
          <Link
            key={liste.idListe}
            className="Liste"
            to={`/candidats/${liste.idListe}`}
          >
            <div className="">
              <h1 className="titreListe">{liste.nomListe}</h1>
              <div className="candidats">
                {candidats.map(function imgReturn(candidat) {
                  if (candidat.idListeElec === liste.idListe) {
                    return (
                      <img
                        key={candidat.idCandidat}
                        src={candidat.photo}
                        alt="candidat"
                        className="candidatPhotoPetit"
                      />
                    );
                  }
                  return <div key={Math.random()} className="dispalyNone" />;
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link className="addButton" to="/adminliste">
        <Fab size="small" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
}
