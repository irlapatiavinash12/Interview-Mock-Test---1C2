import './index.css'

import Header from '../Header'

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="notfound-styling">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
          className="notfound-image"
          alt="not found"
        />
        <h1 className="notfound-title-text">Page Not Found</h1>
        <p className="notfound-descripton">
          We are sorry, the page you requested could not be found.
        </p>
      </div>
    </>
  )
}

export default NotFound
