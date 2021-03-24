import React, {Component, Fragment} from 'react';
import Particles from "react-particles-js";
import Clarifai from 'clarifai';
import Navigation from "./components/Navigation/Navigation";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile"
import './App.css';

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_SECRET_KEY
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

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    pet: '',
    age: ''
  },
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  loadUser = (user) => {
    let id = Number(user.id), name = user.name, email = user.email,
      entries = Number(user.entries), joined = new Date(user.joined),
      pet = user.pet, age = user.age ? Number(user.age) : '';
    this.setState({
      user: {
        id, name, email, entries, joined, pet, age
      }
    });
  }

  calculateFaceLocation = data => {
    const clarifaiFaces = data.outputs[0].data.regions.map(
      // Return an array of bounding_box objects
      face => face.region_info.bounding_box
    )
    // Get the image dimensions
    const image = document.getElementById('input_image');
    const width = Number(image.width);
    const height = Number(image.height);
    // Map over clarifaiFaces array and create new array of objects with dimensions as box
    // points values - 1 box per face
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
      .then(response => {
        if (response) {
          fetch(`${process.env.REACT_APP_URL}/image`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              let entries = Number(count);
              this.setState(Object.assign(this.state.user, {entries}))
            })
            .catch(console.log);
        }
        this.calculateFaceLocation(response)
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route});
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  }

  render() {
    const {imageUrl, boxes, route, isSignedIn, isProfileOpen, user} = this.state;

    return (
      <div className="App">
        <Particles
          className='particles'
          params={particleOptions}
        />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
          toggleModal={this.toggleModal}
        />
        {
          isProfileOpen &&
          <Modal>
            <Profile
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
              user={user}
            />
          </Modal>
        }
        {
          (route === 'signin' || route === 'signout') &&
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        }
        {
          route === 'signup' &&
          <Signup onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        }
        {
          route === 'home' &&
          <Fragment>
            <Logo/>
            <Rank user={this.state.user}/>
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
