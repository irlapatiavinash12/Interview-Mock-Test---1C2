import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class EachCourseDetails extends Component {
  state = {
    status: apiStatusConstants.initial,
    detailedData: {},
  }

  componentDidMount() {
    this.renderData()
  }

  renderLoader = () => {
    return (
      <div data-testid="loader" className="loader-style">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    )
  }

  renderFormat = data => {
    return {
      id: data.id,
      name: data.name,
      imageUrl: data.image_url,
      description: data.description,
    }
  }

  renderFailure = () => {
    return (
      <div className="renderfailure-styling">
        <img
          className="failure-image"
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1 className="failure-title-text">Oops! Something Went Wrong</h1>
        <p className="failure-descripton">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="retry-button"
          onClick={this.renderData}
        >
          Retry
        </button>
      </div>
    )
  }

  renderData = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(url)

    if (response.ok) {
      this.setState({status: apiStatusConstants.success})
      const data = await response.json()
      this.setState({detailedData: this.renderFormat(data.course_details)})
    } else {
      this.setState({status: apiStatusConstants.failure})
      console.log('data fetching error')
    }
  }

  renderSuccessData = () => {
    const {detailedData} = this.state
    const {id, name, imageUrl, description} = detailedData
    return (
      <div className="detailed-content-container">
        <img src={imageUrl} alt={name} className="detailed-course-thumbnail" />
        <div className="detail-info-styling">
          <h1 className="detail-title">{name}</h1>
          <p className="detail-description">{description}</p>
        </div>
      </div>
    )
  }

  renderOutput = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessData()
      case apiStatusConstants.failure:
        return this.renderFailure()
    }
  }

  render() {
    const {status} = this.state
    console.log(status)
    return (
      <>
        <Header />
        <div className="Each-course-main-container">{this.renderOutput()}</div>
      </>
    )
  }
}

export default EachCourseDetails
