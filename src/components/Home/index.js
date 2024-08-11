import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import EachCourse from '../EachCourse'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProcess: 'INPROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    state: apiStatusConstants.initial,
    coursesList: [],
  }

  componentDidMount() {
    this.renderCourses()
  }

  renderLoader = () => {
    return (
      <div data-testid="loader" className="loader-styling">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    )
  }

  renderFormat = data => {
    return {
      id: data.id,
      name: data.name,
      logoUrl: data.logo_url,
    }
  }

  renderCourses = async () => {
    this.setState({status: apiStatusConstants.inProcess})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok) {
      this.setState({status: apiStatusConstants.success})
      const data = await response.json()
      console.log(data.courses)
      this.setState({
        coursesList: data.courses.map(eachItem => this.renderFormat(eachItem)),
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
      console.log('courses list failure')
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
          onClick={this.renderCourses}
        >
          Retry
        </button>
      </div>
    )
  }

  renderSuccess = () => {
    const {coursesList} = this.state
    return (
      <ul className="unordered-courses-styling">
        {coursesList.map(courseItem => (
          <EachCourse courseItem={courseItem} key={courseItem.id} />
        ))}
      </ul>
    )
  }

  renderPattern = () => {
    const {status} = this.state

    switch (status) {
      case apiStatusConstants.inProcess:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {status} = this.state
    console.log(status)
    return (
      <>
        <Header />
        <div className="home-main-container">
          <div className="content-container">
            <h1 className="title-text-styling">Courses</h1>
            {this.renderPattern()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
