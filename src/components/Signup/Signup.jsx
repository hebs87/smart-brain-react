import React, {Component} from "react";
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  onNameChange = event => {
    this.setState({name: event.target.value});
  }

  onEmailChange = event => {
    this.setState({email: event.target.value});
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value});
  }

  onSubmit = () => {
    if (this.state.name && this.state.email && this.state.password) {
      fetch(`${process.env.REACT_APP_URL}/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
      })
        .then(res => res.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange('home');
          } else {
            alert('Something went wrong, please try again!');
          }
        })
        .catch(err => console.log(err))
    } else {
      alert('Something went wrong, please try again!');
    }
  }

  render() {
    const {onRouteChange} = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-white w-100 hover-black"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-white w-100 hover-black"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-white w-100 hover-black"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                value="Sign up"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('signin')}
                className="f6 link dim black db redirect-btn"
              >
                Sign in
              </p>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Signup;
