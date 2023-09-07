import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="HeaderContainer">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="websiteLogo1"
        />
      </Link>
      <ul className="un">
        <Link to="/">
          <li className="button1">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="button1">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="button2" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
