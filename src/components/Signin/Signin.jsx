import React, {Component} from "react";
import './Signin.css';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  onEmailChange = event => {
    this.setState({email: event.target.value});
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value});
  }

  saveAuthTokenSession = (token) => {
    window.localStorage.setItem('token', token);
  }

  onSubmit = () => {
    fetch(`${process.env.REACT_APP_URL}/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.userId) {
          const {success, userId, token} = data;
          if (success === 'true' && userId) {
            this.saveAuthTokenSession(token);
            fetch(`${process.env.REACT_APP_URL}/profile/${userId}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
              .then(res => res.json())
              .then(user => {
                if (user && user.email) {
                  this.props.loadUser(user);
                  this.props.onRouteChange('home');
                }
              })
              .catch(console.log);
          } else {
            alert('Those details didn\'t match, please try again!');
          }
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const {onRouteChange} = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-white w-100 hover-black"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-white w-100 hover-black"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('signup')}
                className="f6 link dim black db redirect-btn"
              >
                Sign up
              </p>
            </div>
          </div>
        </main>
      </article>
    )
  }
}

export default Signin;
