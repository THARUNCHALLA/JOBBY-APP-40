import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', error: '', ischeck: false}

  input = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  Failure = error => {
    this.setState({ischeck: true, error})
  }

  submit = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const Details = {username, password}
    const API = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(Details),
    }
    const response = await fetch(API, options)
    const Data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(Data.jwt_token)
    } else {
      this.Failure(Data.error_msg)
    }
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    const {ischeck, error} = this.state
    return (
      <div className="loginContainer">
        <form className="InsideContainer" onSubmit={this.submit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="websiteLogo"
          />
          <div className="input">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={this.input}
              className="kl"
            />
          </div>
          <div className="input">
            <label htmlFor="username1">PASSWORD</label>
            <input
              type="password"
              id="username1"
              placeholder="Password"
              onChange={this.password}
              className="kl"
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
          {ischeck && <p className="error">{error}</p>}
        </form>
      </div>
    )
  }
}

export default Login
