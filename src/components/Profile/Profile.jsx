import React, {Component} from "react";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.user.name,
      pet: this.props.user.pet,
      age: this.props.user.age,
    };
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case 'user-name':
        this.setState({name: event.target.value});
        break;
      case 'user-pet':
        this.setState({pet: event.target.value});
        break;
      case 'user-age':
        this.setState({age: event.target.value});
        break;
      default:
        return;
    }
  }

  onProfileUpdate = (data) => {
    const token = window.localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_URL}/profile/${this.props.user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({formInput: data})
    })
      .then(res => {
        // If success or cache success response
        if (res.status === 200 || res.status === 304) {
          this.props.toggleModal();
          this.props.loadUser({...this.props.user, ...data})
        }
      })
      .catch(err => console.log(err));
  }

  render () {
    const {toggleModal, user: {entries, joined}} = this.props;
    const {name, pet, age} = this.state;

    return (
      <div
        className="profile-modal"
      >
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib"
              alt="avatar"
            />
            <h1>
              {name}
            </h1>
            <h4>
              {`Images Submitted: ${entries}`}
            </h4>
            <p>
              {`Member Since: ${new Date(joined).toLocaleDateString()}`}
            </p>
            <hr/>
            <label className="mt2 fw6" htmlFor="user-name">Name:</label>
            <input
              className="pa2 ba w-100"
              placeholder={name}
              type="text"
              name="user-name"
              id="name"
              onChange={this.onFormChange}
            />
            <label className="mt2 fw6" htmlFor="user-age">Age:</label>
            <input
              className="pa2 ba w-100"
              placeholder={age}
              type="text"
              name="user-age"
              id="age"
              onChange={this.onFormChange}
            />
            <label className="mt2 fw6" htmlFor="user-name">Pet:</label>
            <input
              className="pa2 ba w-100"
              placeholder={pet}
              type="text"
              name="user-pet"
              id="pet"
              onChange={this.onFormChange}
            />
            <div
              className="mt4"
              style={{display: 'flex', justifyContent: 'space-evenly'}}
            >
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                onClick={() => this.onProfileUpdate({name, age, pet})}
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </main>
          <div
            className="modal-close"
            onClick={toggleModal}
          >
            &times;
          </div>
        </article>
      </div>
    )
  }
}

export default Profile;
