
import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Navigation from './components/Navigation/Navigation';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import Hacker from './components/Hacker/Hacker';
import Scanner from './components/Scanner/Scanner';
import Routes from './Routes/routes';


function App() {
  return (
    <>
      
      <Navbar />
      {/* <Navigation />
      <Admin />
      <User />
      <Hacker />*/}
      
      <Routes />
    </>
  );
}

export default App;
