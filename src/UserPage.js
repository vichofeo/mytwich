import { useState, useEffect }  from 'react'
import update from 'react-addons-update'
import APIInvoker from './utils/APIInvoker'
import { Link } from 'react-router-dom'
import React from 'react'

export default function UserPage(props) {
  const [usuario, setUsuario] = useState({
    edit: false,
    profile: {
      name: '',
      description: '',
      avatar: null,
      banner: null,
      userName: '',
    },
  })

  useEffect(() => {
    let user = 's21' //this.props.params.user
    APIInvoker.invokeGET(
      `/profile/${user}`,
      (response) => {
        setUsuario({ ...usuario, edit: false, profile: response.body })
      },
      (error) => {
        window.location = '/'
      }
    )
  }, [])

  const follow = (e) => {
    let request = {
      followingUser: 's21', //this.props.params.user,
    }
    APIInvoker.invokePOST(
      '/secure/follow',
      request,
      (response) => {
        if (response.ok) {
          setUsuario({ ...usuario, profile: { follow: !response.unfollow } })
        }
      },
      (error) => {
        console.log('Error al actualizar el perfil')
      }
    )
  }

  const changeToEditMode = (e) => {
    if (usuario.edit) {
      let request = {
        username: usuario.profile.userName,
        name: usuario.profile.name,
        description: usuario.profile.description,
        avatar: usuario.profile.avatar,
        banner: usuario.profile.banner,
      }
      APIInvoker.invokePUT(
        '/secure/profile',
        request,
        (response) => {
          if (response.ok) {
            setUsuario({ ...usuario, edit: false })
          }
        },
        (err) => {
          console.error('error al actualizar perfil')
        }
      )
    } else {
      let currentState = usuario.profile
      setUsuario({ ...usuario, edit: true, currentState: currentState })
    }
  }

  const imageSelect = (e) => {
    let id = e.target.id
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]

    if (file.size > 1240000) {
      alert('la imagen supera el maximo de 1 MB')
      return
    }

    reader.onloadend = () => {
      if (id == 'bannerInput') {
        setUsuario({ ...usuario, profile: {...usuario.profile, banner: reader.result } })
      } else {
        setUsuario({ ...usuario, profile: { ...usuario.profile, avatar: reader.result } })
      }
    }
    reader.readAsDataURL(file)
  }

  const handleInput = (e) => {
    console.log("===================");
    console.log(e.target.id);
    console.log("===================");
    let id = e.target.id
    setUsuario({ ...usuario, profile: { ...usuario.profile, [id]: e.target.value } })
    console.log("******************");
    console.log(usuario);
    console.log("***************");
  }

  const cancelEditMode = (e) => {
    let currentState = usuario.currentState
    setUsuario({ ...usuario, edit: false, profile: currentState })
  }

  let profile = usuario.profile
  let storageUserName = window.localStorage.getItem('username')

  let bannerStyle = {
    backgroundImage: `url(${profile.banner})`,
  }
let childs = props.children && React.cloneElement(props.children, {profile: profile})
  return (
    <div id="user-page" className="app-container">
      <header className="user-header">
        <div className="user-banner" style={bannerStyle}>
          {(() => {
            if (usuario.edit) {
              return (
                <div>
                  <label htmlFor="bannerInput" className="btn select-banner">
                    <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
                    <p>Cambia tu foto de encabezado</p>
                  </label>
                  <input
                    href="#"
                    className="btn"
                    accept=".gif,.jpg,.jpeg,.png"
                    type="file"
                    id="bannerInput"
                    onChange={imageSelect.bind(this)}
                  />
                </div>
              )
            }
          })()}
        </div>
        <div className="user-summary">
          <div className="container-fluid">
            <div className="row">
              <div
                className="hidden-xs col-sm-4 col-md-push-1 
col-md-3 col-lg-push-1 col-lg-3"
              ></div>
              <div
                className="col-xs-12 col-sm-8 col-md-push-1 
col-md-7 col-lg-push-1 col-lg-7"
              >
                <ul className="user-summary-menu">
                  <li>
                    className= this.props.route.tab === 'tweets' ? 'selected' :
                    ''
                    <Link to={`/${profile.userName}`}>
                      <p className="summary-label">TWEETS</p>
                      <p className="summary-value">{profile.tweetCount}</p>
                    </Link>
                  </li>
                  <li>
                    className= this.props.route.tab === 'followings' ?
                    'selected' : ''
                    <Link to={`/${profile.userName}/following`}>
                      <p className="summary-label">SIGUIENDO</p>
                      <p className="summary-value">{profile.following}</p>
                    </Link>
                  </li>
                  <li>
                    className= this.props.route.tab === 'followers' ? 'selected'
                    : ''
                    <Link to={`/${profile.userName}/followers`}>
                      <p className="summary-label">SEGUIDORES</p>
                      <p className="summary-value">{profile.followers}</p>
                    </Link>
                  </li>
                </ul>

                {(() => {
                  if (profile.userName === storageUserName) {
                    return (
                      <button
                        className="btn btn-primary edit-button"
                        onClick={changeToEditMode.bind(this)}
                      >
                        {usuario.edit ? 'Guardar' : 'Editar perfil'}
                      </button>
                    )
                  }
                })()}

                {(() => {
                  if (
                    profile.follow != null &&
                    profile.userName !== storageUserName
                  ) {
                    return (
                      <button
                        className="btn edit-button"
                        onClick={follow.bind(this)}
                      >
                        {profile.follow ? (
                          <span>
                            <i
                              className="fa fa-user-times"
                              aria-hidden="true"
                            ></i>{' '}
                            Siguiendo
                          </span>
                        ) : (
                          <span>
                            <i
                              className="fa fa-user-plus"
                              aria-hidden="true"
                            ></i>{' '}
                            Seguir
                          </span>
                        )}
                      </button>
                    )
                  }
                })()}
                {usuario.edit && (
                  <button
                    className="btn edit-button"
                    onClick={cancelEditMode.bind(this)}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div
            className="hidden-xs col-sm-4 col-md-push-1 col-md-3 
 col-lg-push-1 col-lg-3"
          >
            <aside id="user-info">
              <div className="user-avatar">
                {(() => {
                  if (usuario.edit) {
                    return (
                      <div className="avatar-box">
                        <img src={profile.avatar} />
                        <label
                          htmlFor="avatarInput"
                          className="btn select-avatar"
                        >
                          <i
                            className="fa fa-camera fa-2x"
                            aria-hidden="true"
                          ></i>
                          <p>Foto</p>
                        </label>
                        <input
                          href="#"
                          id="avatarInput"
                          className="btn"
                          type="file"
                          accept=".gif,.jpg,.jpeg,.png"
                          onChange={imageSelect.bind(this)}
                        />
                      </div>
                    )
                  } else {
                    return (
                      <div className="avatar-box">
                        <img src={profile.avatar} />
                      </div>
                    )
                  }
                })()}
              </div>

              {(() => {
                if (usuario.edit) {
                  return (
                    <div className="user-info-edit">
                      <input
                        maxLength="20"
                        type="text"
                        value={profile.name}
                        onChange={handleInput}
                        id="name"
                      />
                      <p className="user-info-username">@{profile.userName}</p>
                      <textarea
                        maxLength="180"
                        id="description"
                        value={profile.description}
                        onChange={handleInput}
                      />
                    </div>
                  )
                } else {
                  return (
                    <div>
                      <p className="user-info-name">{profile.name}</p>
                      <p className="user-info-username">@{profile.userName}</p>
                      <p className="user-info-description">
                        {profile.description}
                      </p>
                    </div>
                  )
                }
              })()}
            </aside>
          </div>
          <div
            className="col-xs-12 col-sm-8 col-md-7
 col-md-push-1 col-lg-7">
 aki
   {childs}
 </div>
        </div>
      </div>
    </div>
  )
}
