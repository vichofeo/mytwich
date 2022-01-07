import { useState, useRef } from 'react'
import APIInvoker from './utils/APIInvoker'
import { Link, useNavigate } from 'react-router-dom'

export function Signup() {
  const [usuario, setUsr] = useState({
    username: '',
    name: '',
    password: '',
    userOk: false,
    license: false,
  })
  const ulElement = useRef()
  const slElement = useRef()
  let browserHistory = useNavigate()

  const handleInput = (e) => {
    let field = e.target.name
    let value = e.target.value
    let type = e.target.type

    if (field === 'username') {
      value = value.replace(' ', '').replace('@', '').substring(0, 15)
    } else if (type === 'checkbox') {
      value = e.target.checked
    }
    setUsr({
      ...usuario,
      [field]: value,
    })
  }

  const validateUser = (e) => {
    const usernameLabel = ulElement.current
    let username = e.target.value
    APIInvoker.invokeGET(
      `/usernameValidate/${username}`,
      (res) => {
        setUsr({ ...usuario, userOk: true })
        usernameLabel.innerHTML = res.message
        usernameLabel.className = 'fadeIn animated ok'
      },
      (error) => {
        setUsr({ ...usuario, userOk: false })
        usernameLabel.innerHTML = error.message
        usernameLabel.className = 'fadeIn animated fail'
      }
    )
  }

  //funcion submit
  const signupSubmit = (e) => {
    const submitBtnLabel = slElement.current
    e.preventDefault()
    if (!usuario.license) {
      submitBtnLabel.innerHTML = 'Acepte los terminos de la licencia'
      submitBtnLabel.className = 'shake animated'
      return
    } else if (!usuario.userOk) {
      submitBtnLabel.innerHTML = 'revise el nombre de usuario'
      submitBtnLabel.className = ''
      return
    }
    submitBtnLabel.innerHTML = ''
    submitBtnLabel.className = ''
    let request = {
      name: usuario.name,
      username: usuario.username,
      password: usuario.password,
    }

    //envia datos para grabado
    APIInvoker.invokePOST(
      '/signup',
      request,
      (res) => {
        browserHistory('/login', { replace: true })
      },
      (err) => {
        submitBtnLabel.innerHTML = err.message
        submitBtnLabel.className = 'shake animated'
      }
    )
  }

  return (
    <div id="signup">
      <div className="container">
        <div className="row">
          <div className="col-xs-12"></div>
        </div>
      </div>
      <div className="signup-form">
        <form>
          <h1>Únite hoy a Twitter</h1>
          <input
            type="text"
            value={usuario.username}
            placeholder="@usuario"
            name="username"
            id="username"
            onChange={handleInput}
            onBlur={validateUser}
          />
          <label ref={ulElement} id="usernameLabel" htmlFor="username"></label>

          <input
            type="text"
            value={usuario.name}
            placeholder="Nombre"
            name="name"
            id="name"
            onChange={handleInput}
          />
          <label id="nameLabel" htmlFor="name"></label>

          <input
            type="password"
            id="passwordLabel"
            value={usuario.password}
            placeholder="Contraseña"
            name="password"
            onChange={handleInput}
          />
          <label htmlFor="passwordLabel"></label>

          <input
            id="license"
            type="checkbox"
            value={usuario.license}
            name="license"
            onChange={handleInput}
          />
          <label htmlFor="license">Acepto los terminos de licencia</label>

          <button
            className="btn btn-primary btn-lg"
            id="submitBtn"
            onClick={signupSubmit}
          >
            Regístrate
          </button>
          <label
            ref={slElement}
            id="submitBtnLabel"
            htmlFor="submitBtn"
            className="shake animated hidden "
          ></label>
          <p className="bg-danger user-test">
            Crea un usuario o usa el usuario <strong>test/test</strong>
          </p>
          <p>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link> </p>
          
          <p>¿Ya tienes cuenta? Iniciar sesión</p>
        </form>
      </div>
    </div>
  )
}
