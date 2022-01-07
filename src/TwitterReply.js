import PropTypes from 'prop-types'
import Reply from './Reply'
import Tweet from './Tweet'
import APIInvoker from './utils/APIInvoker'
export default function TweetReply(props) {

  const handleClose = () => {
    let html = document.getElementsByTagName("html")[0]
    let dialog = document.getElementById("dialog")
    html.classList.remove('modal-mode')

    console.log('************************************');
    console.log(html);
    console.log('***************************************'); 
    //dialog.innerHTML = ""
        
    
  }
  const addNewTweet = (newTweet) => {
    let request = {
      tweetParent: props.tweet._id,
      /*message: newTweet.message,
      image: newTweet.image,
      */
    }
    APIInvoker.invokePOST(
      '/secure/tweet',
      request,
      (response) => {
        handleClose()
      },
      (err) => {
        console.log('Error al carar los Tweets')
      }
    )
  }



  let operations = {
    addNewTweet: addNewTweet(),
  }
  return (
    <div className="fullscreen">
      <div className="tweet-detail">
        <i
          className="fa fa-times fa-2x tweet-close"
          aria-hidden="true"
          onClick={handleClose}
        >xxx</i>
         
         <Tweet key={props.tweet._id} tweet={props.tweet}></Tweet>
        <div className="tweet-details-reply">
        Reply
        </div>
      </div>
    </div>
  )
}

TweetReply.propTypes = { 
     tweet: PropTypes.object.isRequired, 
     profile: PropTypes.object.isRequired, 
     } 