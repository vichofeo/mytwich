import Profile from './Profile'
import TweetsContainer from './TweetsContainer'
import PropTypes from 'prop-types'
import SuggestedUser  from './SuggestedUsers'

export default function TwitterDashboard(props) {
  console.log('====================================');
  console.log(props);
  console.log('====================================');
  return (
    <div id="dashboard">
      <div className="container-fluid">
        <div className="row">
          <div
            className="hidden-xs col-sm-4 col-md-push-1 
col-md-3 col-lg-push-1 col-lg-3"
          >
            <Profile profile={props.profile} />
          </div>
          <div
            className="col-xs-12 col-sm-8 col-md-push-1 
col-md-7 col-lg-push-1 col-lg-4"
          >
            <TweetsContainer profile={props.profile} />
          </div>
          <div
            className="hidden-xs hidden-sm hidden-md 
col-lg-push-1 col-lg-3"
          >
            <SuggestedUser />
          </div>
        </div>
      </div>
    </div>
  )
}

TwitterDashboard.propTypes = {
  profile: PropTypes.object.isRequired,
}
