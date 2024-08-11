import './index.css'

import {Link} from 'react-router-dom'

const EachCourse = props => {
  const {courseItem} = props
  const {id, name, logoUrl} = courseItem
  return (
    <Link className="nav-link-styling" to={`/courses/${id}`}>
      <li className="list-item-styling">
        <img src={logoUrl} alt={name} className="course-thumbnail" />
        <p className="course">{name}</p>
      </li>
    </Link>
  )
}

export default EachCourse
