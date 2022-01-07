import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import CSSTransitionGroup from 'react-transition-group/CSSTransition'
import APIInvoker from './utils/APIInvoker'

export default function Followers(props) {
  const [users, setUsers] = useState({ tab: null, listUsers: [] })

  const findUsers = (userName) => {
    APIInvoker.invokeGET(
      `/followers/${userName}`,
      (res) => {
        setUsers({ ...users, listUsers: res.body })
      },
      (err) => {
        console.log('error de autentificacion')
      }
    )
  }

  useEffect(() => {
    setUsers({ tab: props.route.tab, listUsers: [] })
    findUsers(props.profile.userName)
  }, [])
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
Followers.prototype = {
  profile: PropTypes.object,
}
