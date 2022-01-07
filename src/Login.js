import { useState, useRef, useEffect } from 'react'
import APIInvoker from './utils/APIInvoker'
import { Link } from 'react-router-dom';
export function Login () {
  const [usuario, setusuario] = useState({ username: '', password: '' })
  const lElement = useRef();

  //funcion para el onchange input
  const inputChange = (e) => {
    let field = e.target.name
    let value = e.target.value
    if (field === 'username') {
      value = value
        .replace(' ', '')
        .replace('@', '')
        .substring(0, 15)
    }

    setusuario({
      ...usuario,
      [field]: value,
    })
  }
  //funcion de logueo
  const login = (e) => {
    e.preventDefault()
    const labelElement = lElement.current    

    console.log(labelElement.className)
    let req = {
      username: usuario.username,
      password: usuario.password,
    }

    APIInvoker.invokePOST(
      '/login',
      req,
      (res) => {
        window.localStorage.setItem('token', res.token)
        window.localStorage.setItem('username', res.profile.userName)
        window.location = '/'
      },
      (err) => {
        
        labelElement.innerHTML = err.message
        labelElement.className = 'shake animated'
        console.log('error en la autentificacion')
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
        <form onSubmit={login}>
          <h1>Iniciar sesión en Twitter</h1>

          <input
            type="text"
            value={usuario.username}
            placeholder="usuario"
            name="username"
            id="username"
            onChange={inputChange}
          />
          <label
            
            id="usernameLabel"
            htmlFor="username"
          ></label>

          <input
            type="password"
            id="passwordLabel"
            value={usuario.password}
            placeholder="Contraseña"
            name="password"
            onChange={inputChange}
          />
          <label  htmlFor="passwordLabel"></label>

          <button
            className="btn btn-primary btn-lg "
            id="submitBtn"
            onClick={login}
          >
            Regístrate
          </button>
          <label
            ref={lElement}
            id="submitBtnLabel"
            htmlFor="submitBtn"
            className="shake animated hidden "
          ></label>
          <p className="bg-danger user-test">
            Crea un usuario o usa el usuario
            <strong>test/test</strong>
          </p>
          <p>¿No tienes una cuenta? Registrate</p>
          <p>
            ¿No tienes una cuenta? <Link to="/signup">Registrate</Link>{' '}
          </p>
        </form>
      </div>
    </div>
  )
}
