import React from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navigation/>
      <Logo/>
    </div>
  );
}

export default App;
