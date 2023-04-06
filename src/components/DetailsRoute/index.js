import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class DetailsRoute extends Component {
  state = {courseDetails: {}, isLoaderLoading: true, isFetchSuccess: ''}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedObject = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        courseDetails: updatedObject,
        isLoaderLoading: false,
        isFetchSuccess: true,
      })
    } else {
      this.setState({isLoaderLoading: false, isFetchSuccess: false})
    }
  }

  renderLoaderCard = () => (
    <div className="loader-bg-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderFailureCard = () => (
    <div className="failure-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getCourseDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessCard = () => {
    const {courseDetails} = this.state
    return (
      <div className="course-details-bg-container">
        <div className="course-details-card">
          <img
            src={courseDetails.imageUrl}
            alt={courseDetails.name}
            className="course-details-image"
          />
          <div className="course-details-content-card">
            <h1 className="course-details-content-card">
              {courseDetails.name}
            </h1>
            <p className="course-details-content-card-description">
              {courseDetails.description}
            </p>
          </div>
        </div>
      </div>
    )
  }

  renderHomeCard = () => {
    const {isFetchSuccess} = this.state
    return (
      <>
        {isFetchSuccess ? this.renderSuccessCard() : this.renderFailureCard()}
      </>
    )
  }

  render() {
    const {isLoaderLoading} = this.state
    return (
      <>
        <Navbar />
        {isLoaderLoading ? this.renderLoaderCard() : this.renderHomeCard()}
      </>
    )
  }
}

export default DetailsRoute
