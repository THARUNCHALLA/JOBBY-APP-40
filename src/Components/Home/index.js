import {Component} from 'react'

import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="HomeContainer">
          <li className="Container123">
            <h1 className="Head">Find the Job that fits your life</h1>
            <p className="Description">
              Millions of People are Searching for jobs,Salary
              Information,Company Reviews.Find the job that fit yours abilities
              and potential.
            </p>
            <Link to="/jobs">
              <button type="button" className="button3">
                Find Jobs
              </button>
            </Link>
          </li>
        </div>
      </>
    )
  }
}

export default Home
