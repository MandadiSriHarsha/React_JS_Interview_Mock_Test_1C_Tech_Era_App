import Navbar from '../Navbar'

import './index.css'

const NotFound = () => (
  <>
    <Navbar />
    <div className="not-found-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
