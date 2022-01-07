
import PropTypes from 'prop-types'
import SuggestedUser from './SuggestedUsers'
import TweetsContainer from './TweetsContainer'

export default function MyTweets(props){

    return(
        <div className="row"> 
        <div className="col-xs-12 col-sm-12 col-md-12
        col-lg-8 no-padding-right"> 
        <TweetsContainer profile={props.profile} onlyUserTwwet={true} />
        </div> 
        <div className="hidden-xs hidden-sm hidden-md col-lg-4"> 
        <SuggestedUser/>
        </div> 
        </div> 
    )
}

MyTweets.prototype ={
    profile: PropTypes.object
}