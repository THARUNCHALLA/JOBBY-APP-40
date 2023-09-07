import {MdLocationOn, MdWork} from 'react-icons/md'

import {BsStarFill} from 'react-icons/bs'

import './index.css'

const EachjobDetails = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    jobDescription,
    location,
    employmentType,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="listContainer1">
      <div className="imageContainer">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="description">Description</h1>
      <p className="jobDe">{jobDescription}</p>
      <div className="locationContainer">
        <div className="insideLocationContainer">
          <MdLocationOn className="md-icon" />
          <p className="location">{location}</p>
          <MdWork className="md-icon" />
          <p className="location">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default EachjobDetails
