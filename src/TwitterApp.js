import APIInvoker from './utils/APIInvoker'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TweetsContainer from './TweetsContainer'
import TwitterDashboard from './TwitterDashboard'
import Toolbar from './Toolbar'

export function TwitterApp(props) {
  const [muro, setMuro] = useState({ load: true, profile: null })
  let browserHistory = useNavigate()

  useEffect(() => {
    let token = window.localStorage.getItem('token')
    if (token == null) {
      // browserHistory.push('/login')
      browserHistory('/login', { replace: true })
      setMuro({ load: true, profile: null })
    } else {
      APIInvoker.invokeGET(
        '/secure/relogin',
        (res) => {
          setMuro({ load: true, profile: res.profile })
          window.localStorage.setItem('token', res.token)
          window.localStorage.setItem('username', res.profile.userName)
        },
        (err) => {
          console.log('error al autentificar al usuario')
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('username')
          //  browserHistory.push('/login')
          browserHistory('/login', { replace: true })
        }
      )
    }
  }, [])
  
  return (
    <div id="mainApp">
    <Toolbar profile={muro.profile} />
      {(() => {
        if (!muro.load) {
          return (
            <div className="tweet-detail">
             {muro.load}
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
              {muro.profile}
            </div>
          )
        } else if (props.children == null && muro.profile != null) {
          return <TwitterDashboard profile={muro.profile}/>
        } else {
          return props.children
        }
      })()}
      
      <div id="dialog"></div>
    </div>
  )
}
