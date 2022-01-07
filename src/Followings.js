import CSSTransitionGroup from 'react-transition-group/CSSTransition'
import { useState, useEffect } from 'react'
import APIInvoker from './utils/APIInvoker'
import UserCard from './UserCard'
import PropTypes from 'prop-types'
export default function Followings(props) {
  const [users, setUsers] = useState({ tab: null, listUsers: [] })

  useEffect(() => {
    setUsers({ tab: props.route.tab, listUsers: [] })
    findUsers(props.profile.userName)
  }, [])

  const findUsers = (userName) => {
    APIInvoker.invokeGET(
      `/followings/${userName}`,
      (res) => {
        setUsers({ ...users, listUsers: res.body })
      },
      (err) => {
        console.log('Error en la autenticacion')
      }
    )
  }

  return (
    <section>
      <div className="container-fluid no-padding">
        <div className="row no-padding">
          <CSSTransitionGroup
            transitionName="card"
            transitionEnter={true}
            transitionEnterTimeout={500}
            transitionAppear={false}
            transitionAppearTimeout={0}
            transitionLeave={false}
            transitionLeaveTimeout={0}
          >
            {users.listUsers.map((user) => (
              <div
                className="col-xs-12 col-sm-6 col-lg-4"
                
                key={`${users.tab}-${user._id}`}
              >
                <UserCard user={user} />
              </div>
            ))}
          </CSSTransitionGroup>
        </div>
      </div>
    </section>
  )
}

Followings.prototype = {
    profile:PropTypes.object
}