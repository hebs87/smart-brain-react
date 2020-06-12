import React, {Component, Fragment} from 'react';
import Particles from "react-particles-js";
import Clarifai from 'clarifai';
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Login";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import './App.css';

const app = new Clarifai.App({
  apiKey: '45088f56be1145f49e01c4ae0c80bd35'
})

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      isLogin: true,
    }
  }

  calculateFaceLocation = data => {
    const clarifaiFaces = data.outputs[0].data.regions.map(
      face => face.region_info.bounding_box
    )
    const image = document.getElementById('input_image');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = clarifaiFaces.map(
      (clarifaiFace, index) => ({
        id: index,
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
      })
    )
    this.setState({boxes});
  }

  onInputChange = event => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.calculateFaceLocation(response))
      .catch(err => console.log(err));
  }

  onRouteChange = (value) => {
    this.setState({isLogin: value});
  }

  render() {
    const {imageUrl, boxes, isLogin} = this.state;

    return (
      <div className="App">
        <Particles
          className='particles'
          params={particleOptions}
        />
        <Navigation onRouteChange={this.onRouteChange}/>
        {
          isLogin &&
          <Signin onRouteChange={this.onRouteChange}/>
        }
        {
          !isLogin &&
          <Fragment>
            <Logo/>
            <Rank/>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} boxes={boxes}/>
          </Fragment>
        }
      </div>
    );
  }
}

export default App;
