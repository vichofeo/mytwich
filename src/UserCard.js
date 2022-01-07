import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function UserCard(props) {
  let user = props.user
  let css = {
    backgroundImage: `url(${user.banner})`,
  }

  return (
    <article className="user-card">
      <header className="user-card-banner" style={css}>
        <img src={user.avatar} className="user-card-avatar" />
      </header>
      <div className="user-card-body">
        <Link to={`/${user.userName}`} className="user-card-name">
          <p>{user.name}</p>
        </Link>
        <Link to={`/${user.userName}`} className="user-card-username">
          <p>@{user.userName}</p>
        </Link>
        <p className="user-card-description">{user.description}</p>
      </div>
    </article>
  )
}
UserCard.prototype = {
  user: PropTypes.object.isRequired,
}
