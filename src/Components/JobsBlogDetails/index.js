import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsStarFill} from 'react-icons/bs'

import {BiLinkExternal} from 'react-icons/bi'

import {MdLocationOn, MdWork} from 'react-icons/md'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import EachjobDetails from '../EachjobDetails'

import './index.css'

const apiStatus2 = {
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}

class JobsBlogDetails extends Component {
  state = {jobDe: {}, tharun12: [], Similar: [], api2: ''}

  componentDidMount() {
    this.jobDetails12()
  }

  jobDetails12 = async () => {
    this.setState({api2: apiStatus2.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const URL = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(URL, options)
    const Data1 = await response.json()
    if (response.ok === true) {
      const JobDetails = Data1.job_details
      const SimilarJobs = Data1.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        ID: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      const updatedData = {
        companyLogoUrl1: JobDetails.company_logo_url,
        companyWebsiteUrl: JobDetails.company_website_url,
        employmentType: JobDetails.employment_type,
        jobDescription: JobDetails.job_description,
        Description: JobDetails.life_at_company.description,
        JOBImageUrl: JobDetails.life_at_company.image_url,
        location: JobDetails.location,
        package1: JobDetails.package_per_annum,
        rating: JobDetails.rating,
        skills: JobDetails.skills.map(eachValue => ({
          imageUrl: eachValue.image_url,
          name: eachValue.name,
        })),
        title: JobDetails.title,
        id: JobDetails.id,
      }
      this.setState(
        {
          jobDe: updatedData,
          tharun12: updatedData.skills,
          Similar: SimilarJobs,
          api2: apiStatus2.success,
        },
        this.tharun1,
      )
    } else {
      this.setState({api2: apiStatus2.failure})
    }
  }

  retry2 = () => {
    this.jobDetails12()
  }

  renderLoadingView2 = () => (
    <>
      <Header />
      <div
        className="loader-container backGroundContainer"
        data-testid="loader"
      >
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderFailureView2 = () => (
    <>
      <Header />
      <div className="backGroundContainer middle">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failureView2"
        />
        <h1 className="oop">Oops! Something Went Wrong</h1>
        <p className="we">
          We cannot seem to find the page you are looking for
        </p>
        <button type="button" className="Retry" onClick={this.retry2}>
          Retry
        </button>
      </div>
    </>
  )

  renderView2 = () => {
    const {jobDe, tharun12, Similar} = this.state
    const {
      companyLogoUrl1,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      Description,
      JOBImageUrl,
      location,
      rating,
      package1,
      title,
      id,
    } = jobDe
    return (
      <>
        <Header />
        <div className="backGroundContainer">
          <li className="listContainer" key={id}>
            <div className="imageContainer">
              <img
                src={companyLogoUrl1}
                alt="job details company logo"
                className="companyLogoUrl"
              />
              <div className="insideStarContainer">
                <h1 className="title">{title}</h1>
                <div className="starContainer">
                  <BsStarFill className="star-image" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="locationContainer">
              <div className="insideLocationContainer">
                <MdLocationOn className="md-icon" />
                <p className="location">{location}</p>
                <MdWork className="md-icon" />
                <p className="location">{employmentType}</p>
              </div>
              <p className="package">{package1}</p>
            </div>
            <hr className="hr" />
            <div className="desc-holder">
              <h1 className="description-heading">Description</h1>
              <a href={companyWebsiteUrl} rel="noreferrer" target="_blank">
                <p className="violet-text">
                  Visit <BiLinkExternal className="visit" />
                </p>
              </a>
            </div>
            <p className="jobDe">{jobDescription}</p>
            <h1 className="description-heading">Skills</h1>
            <ul className="skills-list">
              {tharun12.map(eachItem => (
                <li className="skill-item" key={eachItem.name}>
                  <img
                    src={eachItem.imageUrl}
                    className="skill-image"
                    alt={eachItem.name}
                  />
                  <p className="skill-name">{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="description-heading ">Life at Company</h1>
            <div className="life-at-company-holder">
              <p className="life-at-company-description">{Description}</p>
              <img
                src={JOBImageUrl}
                className="life-at-company-image"
                alt="life at company"
              />
            </div>
          </li>
          <h1 className="description-heading">Similar Jobs</h1>
          <ul className="unorderedList">
            {Similar.map(each => (
              <EachjobDetails similarJobDetails={each} key={each.ID} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  tharun1 = () => {
    const {api2} = this.state
    switch (api2) {
      case apiStatus2.success:
        return this.renderView2()
      case apiStatus2.inprogress:
        return this.renderLoadingView2()
      case apiStatus2.failure:
        return this.renderFailureView2()
      default:
        return null
    }
  }

  render() {
    return this.tharun1()
  }
}

export default JobsBlogDetails
