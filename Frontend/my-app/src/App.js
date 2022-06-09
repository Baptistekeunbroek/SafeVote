import './App.css';
import { Register } from './components/register';
import { Login } from './components/login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="Presentation">
      <h1 className="PresentationTitre">SafeVote</h1>
      <p className="PresentationPave">
        Nous sommes 4 étudiants en informatique dans l'École d’ingénieur du
        numérique, Efrei Paris. Dans le cadre de notre cursus, nous devons
        réaliser un projet lors du Mastercamp, un camp d'entraînement ayant pour
        but de nous préparer au début de notre master. Nous avons intégré la
        filière IT Applications and Services dans laquelle il nous a été
        présenté le projet de vote à distance. Ce projet s’inscrit bien dans la
        continuité des actualités de ces dernières années. Notamment depuis la
        COVID, le travail en distanciel a pris une ampleur inédite. En effet, de
        plus en plus d’entreprises, d’organismes et d’institutions ont désormais
        recours au fonctionnement en distanciel. D'autres sont encore réticents
        et n'ont pas franchi le pas. Mais tout comme certaines entreprises
        encore réticentes à l’idée d’adopter le distanciel, le ministère de
        l’Intérieur ne propose pas à ce jour de solution pour voter sans se
        déplacer dans un bureau de vote.
      </p>
      <p className="PresentationPave mt">
        Notre projet étant de proposer un service de vote à distance, nous nous
        adressons à toutes personnes disposant du droit de vote. Que ce soit un
        jeune de 18 ans ou une personne âgée. Chacun pourra voter de manière
        fiable et sécurisée. Nous devons donc mettre au point un produit pour
        ces personnes qui ne disposent pas des moyens de se déplacer dans un
        bureau de vote. Que ce soit par manque de temps, de moyens de transports
        ou bien parce que la personne se trouve à l’étranger. Mais nous devons
        aussi présenter un produit que chacune de ces personnes sera capable
        d’utiliser. Cela va de la difficulté d’utilisation pour les personnes
        non familière avec les technologies mais aussi une technologie que des
        personnes défavorisées n’auront pas trop de mal à se procurer, pour que
        cela ne prenne pas plus de temps que de se rendre au bureau de vote le
        plus proche.
      </p>
      <div className="login">
        <Link to={'/login'}>
          <button className="btn-75">login</button>
        </Link>
      </div>
      <div className="register">
        <Link to={'/register'}>
          <button className="btn-75">register</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <a href="/">
          <button>Home</button>
        </a>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
