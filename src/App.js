import React from 'react';
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import './App.css';

const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const App = () => {
  return (
    <div className="App">
      <Particles
        className='particles'
        params={particleOptions}
      />
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
    </div>
  );
}

export default App;
