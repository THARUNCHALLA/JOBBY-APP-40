import {BsStarFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'

import {MdLocationOn, MdWork} from 'react-icons/md'

import './index.css'

const Final = props => {
  const {list} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
    id,
  } = list
  return (
    <Link to={`/jobs/${id}`}>
      <li className="listContainer">
        <div className="imageContainer">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="hr" />
        <h1 className="description">Description</h1>
        <p className="jobDe">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default Final
