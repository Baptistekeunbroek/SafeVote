import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { React } from 'react';
import { Register } from './components/register';
import { Login } from './components/login';
import { UserInfo } from './components/userInfo';
import sample from './misc/videoBack.mp4';
import { Candidats } from './components/candidats';
import logo from './safevotelogo.png';
import './App.css';

function Home() {
  return (
    <div className="Home">
      <video className="videoTag" autoPlay loop muted>
        <source src={sample} type="video/mp4" />
      </video>
      <div className="Presentation">
        <h1 className="PresentationTitre">SafeVote</h1>
        <p className="presentationAcceuil">Rapide</p>
        <p className="presentationAcceuil mt">Sécurisé</p>
        <p className="presentationAcceuil mt">Accessible</p>
      </div>
    </div>
  );
}

function NavigationBar() {
  return (
    <div className="NavBar">
      <div className="logos">
        <img src={logo} alt="logo" />
      </div>
      <div className="navigation">
        <div className="acceuil">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-home"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="5 12 3 12 12 3 21 12 19 12" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
            </svg>
          </Link>
        </div>
        <div className="separator" />
        <div className="connexion">
          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="7" r="4" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/candidats" element={<Candidats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
