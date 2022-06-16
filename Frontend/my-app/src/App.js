import './App.css';
import { Register } from './components/register';
import { Login } from './components/login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { UserInfo } from './components/userInfo';
import sample from './misc/videoBack.mp4';

function BG() {}

function Home() {
  return (
    <div className="Home">
      <video className="videoTag" autoPlay loop muted>
        <source src={sample} type="video/mp4" />
      </video>
      <div className="Presentation">
        <h1 className="PresentationTitre">SafeVote</h1>
        <p className="presentationAcceuil">
          Nous sommes 4 étudiants en informatique dans l'École d’ingénieur du
          numérique, Efrei Paris. Dans le cadre de notre cursus, nous devons
          réaliser un projet lors du Mastercamp, un camp d'entraînement ayant
          pour but de nous préparer au début de notre master. Nous avons intégré
          la filière IT Applications and Services dans laquelle il nous a été
          présenté le projet de vote à distance. Ce projet s’inscrit bien dans
          la continuité des actualités de ces dernières années. Notamment depuis
          la COVID, le travail en distanciel a pris une ampleur inédite. En
          effet, de plus en plus d’entreprises, d’organismes et d’institutions
          ont désormais recours au fonctionnement en distanciel. D'autres sont
          encore réticents et n'ont pas franchi le pas. Mais tout comme
          certaines entreprises encore réticentes à l’idée d’adopter le
          distanciel, le ministère de l’Intérieur ne propose pas à ce jour de
          solution pour voter sans se déplacer dans un bureau de vote.
        </p>
        <p className="presentationAcceuil mt">
          Notre projet étant de proposer un service de vote à distance, nous
          nous adressons à toutes personnes disposant du droit de vote. Que ce
          soit un jeune de 18 ans ou une personne âgée. Chacun pourra voter de
          manière fiable et sécurisée. Nous devons donc mettre au point un
          produit pour ces personnes qui ne disposent pas des moyens de se
          déplacer dans un bureau de vote. Que ce soit par manque de temps, de
          moyens de transports ou bien parce que la personne se trouve à
          l’étranger. Mais nous devons aussi présenter un produit que chacune de
          ces personnes sera capable d’utiliser. Cela va de la difficulté
          d’utilisation pour les personnes non familière avec les technologies
          mais aussi une technologie que des personnes défavorisées n’auront pas
          trop de mal à se procurer, pour que cela ne prenne pas plus de temps
          que de se rendre au bureau de vote le plus proche.
        </p>
      </div>
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="NavBar">
      <div className="acceuil">
        <Link to={'/'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-home"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <polyline points="5 12 3 12 12 3 21 12 19 12"></polyline>
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
          </svg>
        </Link>
      </div>
      <div className="connexion">
        <Link to={'/login'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-user"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="12" cy="7" r="4"></circle>
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <BG />
        <NavigationBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userinfo" element={<UserInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
