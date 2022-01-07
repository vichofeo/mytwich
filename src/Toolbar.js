import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export default function Toolbar(props) {
  
  const logout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    window.location = '/login'
  }

  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <span className="visible-xs bs-test">XS</span>
      <span className="visible-sm bs-test">SM</span>
      <span className="visible-md bs-test">MD</span>
      <span className="visible-lg bs-test">LG</span>

      <div className="container-fluid">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <ul id="menu">
              <li id="tbHome" className="selected">
                <Link to="/">
                  <p className="menu-item">
                    <i
                      className="fa fa-home menu-item-icon"
                      aria-hidden="true"
                    ></i>{' '}
                    <span className="hidden-xs hidden-sm">Inicio</span>
                  </p>
                </Link>
              </li>
            </ul>
          </div>

          {props.profile != null && (
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    className="navbar-avatar"
                    src={props.profile.avatar}
                    alt={props.profile.userName}
                  />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href={`/${props.profile.userName}`}>Ver perfil</a>
                  </li>
                  <li role="separator" className="divider"></li>
                  <li>
                    <a href="#" onClick={logout.bind(this)}>
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

Toolbar.propTypes ={
    profile: PropTypes.object
}

  