import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import EmploymentTypesList from '../EmploymentTypesList'

import SalaryRangesList from '../SalaryRangesList'

import Final from '../Final'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}
const apiStatus1 = {
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    api: '',
    final: [],
    searchInput: '',
    tharun: '',
    checkboxArray: [],
    salary: 0,
    shortBioDetails: [],
    api1: '',
  }

  componentDidMount = () => {
    this.getJobsList()
    this.shortBio()
  }

  checkboxEvent = label => {
    const {checkboxArray} = this.state
    if (!checkboxArray.includes(label)) {
      this.setState(prevState => ({
        checkboxArray: [...prevState.checkboxArray, label],
      }))
    } else {
      this.setState(prevState => ({
        checkboxArray: prevState.checkboxArray.filter(each => each !== label),
      }))
    }
  }

  RadioBox = label => {
    this.setState({salary: parseInt(label[0])})
  }

  shortBio = async () => {
    this.setState({api1: apiStatus1.inprogress})
    const ApiUrl1 = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(ApiUrl1, options)
    const shortBio = await response.json()
    if (response.ok === true) {
      const ans = shortBio.profile_details
      const updatedData1 = {
        name: ans.name,
        profileImageUrl: ans.profile_image_url,
        shortBio: ans.short_bio,
      }
      this.setState({shortBioDetails: updatedData1, api1: apiStatus1.success})
    } else {
      this.setState({api1: apiStatus1.failure})
    }
  }

  getJobsList = async () => {
    this.setState({api: apiStatus.inprogress})
    const ApiUrl = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(ApiUrl, options)
    const JobDetails = await response.json()
    if (response.ok === true) {
      const UpdatedData = JobDetails.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({final: UpdatedData, api: apiStatus.success})
    } else {
      this.setState({api: apiStatus.failure})
    }
  }

  retry = () => {
    this.getJobsList()
  }

  retry1 = () => {
    this.shortBio()
  }

  noJobs = () => (
    <div className="noJobsContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="oop">No Jobs Found</h1>
      <p className="we">We could not find any jobs. Try other filters</p>
    </div>
  )

  renderView = () => {
    const {final, tharun, checkboxArray, salary} = this.state

    const filter = final.filter(each =>
      each.title.toLowerCase().includes(tharun.toLowerCase()),
    )

    const filter1 = filter.filter(each =>
      checkboxArray.includes(each.employmentType),
    )
    const ans = filter.filter(item => {
      const number = parseFloat(item.packagePerAnnum)
      return typeof number === 'number' && number >= salary
    })
    const ans1 = filter1.filter(item => {
      const number = parseFloat(item.packagePerAnnum)
      return typeof number === 'number' && number >= salary
    })

    return (
      <div>
        {checkboxArray.length === 0 &&
          (ans.length > 0
            ? ans.map(each => <Final list={each} key={each.id} />)
            : this.noJobs())}
        {checkboxArray.length > 0 &&
          (ans1.length > 0
            ? ans1.map(each => <Final list={each} key={each.id} />)
            : this.noJobs())}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureView"
      />
      <h1 className="oop">Oops! Something Went Wrong</h1>
      <p className="we">We cannot seem to find the page you are looking for</p>
      <button type="button" className="Retry" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderView1 = () => {
    const {shortBioDetails} = this.state
    const {profileImageUrl, name, shortBio} = shortBioDetails
    return (
      <ul>
        <img src={profileImageUrl} alt="profile" className="logo" />
        <h1 className="rahul">{name}</h1>
        <p className="lead">{shortBio}</p>
      </ul>
    )
  }

  renderFailureView1 = () => (
    <div className="failureContainer">
      <button type="button" className="Retry" onClick={this.retry1}>
        Retry
      </button>
    </div>
  )

  renderLoadingView1 = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  tharun = () => {
    const {api} = this.state
    switch (api) {
      case apiStatus.success:
        return this.renderView()
      case apiStatus.inprogress:
        return this.renderLoadingView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  SHORTBIO = () => {
    const {api1} = this.state
    switch (api1) {
      case apiStatus1.success:
        return this.renderView1()
      case apiStatus1.inprogress:
        return this.renderLoadingView1()
      case apiStatus1.failure:
        return this.renderFailureView1()
      default:
        return null
    }
  }

  searchKeyDown = e => {
    const {searchInput} = this.state
    if (e.key === 'Enter') {
      this.setState({tharun: searchInput}, this.getJobsList)
    }
  }

  searchClick = () => {
    const {searchInput} = this.state
    this.setState({tharun: searchInput}, this.getJobsList)
  }

  searchChange = e => {
    this.setState({searchInput: e.target.value})
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="HomeContainer1">
          <div className="leftContainer">
            <div className="JobContainer">{this.SHORTBIO()}</div>
            <hr />
            <ul className="ul">
              <h1 className="types">Type of Employment</h1>
              {employmentTypesList.map(eachItem => (
                <EmploymentTypesList
                  User1={eachItem}
                  key={eachItem.employmentTypeId}
                  checkboxEvent={this.checkboxEvent}
                />
              ))}
              <hr />
            </ul>
            <ul className="ul">
              <h1 className="types">Salary Range</h1>
              {salaryRangesList.map(eachItem => (
                <SalaryRangesList
                  User1={eachItem}
                  key={eachItem.salaryRangeId}
                  RadioBox={this.RadioBox}
                />
              ))}
            </ul>
          </div>
          <div className="RightContainer">
            <div className="SearchContainer">
              <input
                type="search"
                className="search"
                value={searchInput}
                placeholder="Search"
                onChange={this.searchChange}
                onKeyDown={this.searchKeyDown}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="icon"
                onClick={this.searchClick}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.tharun()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
