import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class HomeRoute extends Component {
  state = {coursesList: [], isLoaderLoading: true, isFetchSuccess: ''}

  componentDidMount() {
    this.fetchCourseData()
  }

  fetchCourseData = async () => {
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const {courses} = data
      const updatedList = courses.map(eachitem => ({
        id: eachitem.id,
        name: eachitem.name,
        logoUrl: eachitem.logo_url,
      }))
      this.setState({
        isFetchSuccess: true,
        isLoaderLoading: false,
        coursesList: updatedList,
      })
    } else {
      this.setState({isFetchSuccess: false, isLoaderLoading: false})
    }
  }

  renderLoaderCard = () => (
    <div className="loader-bg-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderSuccessCard = () => {
    const {coursesList} = this.state
    return (
      <>
        <h1 className="courses-heading">Courses</h1>
        <ul className="courses-list-bg-container">
          {coursesList.map(eachitem => (
            <li className="course-item" key={eachitem.id}>
              <Link to={`/courses/${eachitem.id}`} className="link-item">
                <img
                  src={eachitem.logoUrl}
                  alt={eachitem.name}
                  className="course-logo"
                />
                <p className="course-heading">{eachitem.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

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
        onClick={this.fetchCourseData}
      >
        Retry
      </button>
    </div>
  )

  renderListCard = () => {
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
        <div className="home-page-bg-container">
          {isLoaderLoading ? this.renderLoaderCard() : this.renderListCard()}
        </div>
      </>
    )
  }
}

export default HomeRoute
