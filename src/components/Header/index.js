import './index.css'

import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png "
          className="image-element"
          alt="website logo"
        />
      </Link>
    </nav>
  )
}

export default Header
