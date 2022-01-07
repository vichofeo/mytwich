import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TweetReply from './TwitterReply'
import APIInvoker from './utils/APIInvoker'
import { render } from 'react-dom'
export default function Tweet(props) {
  
  //props contiene el tweet uno solo

  let browserHistory = useNavigate()
  const [tweet, setTweet] = useState(props.tweet)

  //let tweet = props.tweet
  let tweetClass = null

  //metodos
  const handleClick = (e) => {
    if (e.target.getAttribute('data-ignore-onclick')) {
      return
    }
    let url = `/${tweet._creator.userName}/${tweet._id}`
    browserHistory(url, { replace: false })
    let tweetId = e.target.id
  }

  const handleLike = (e) => {
    
    e.preventDefault()
    let request = {
      tweetID: tweet._id,
      like: !tweet.liked,
    }
    
    APIInvoker.invokePOST('/secure/like', request, (res) => {
      let newState = tweet
      newState.likeCounter = res.body.likeCounter
      newState.liked = !res.body.liked
      
      setTweet(newState)
      
    })
  }

  const handleReply = (e)=>{
    let html = document.getElementsByTagName("html")[0]       
    html.classList.add("modal-mode")
    e.preventDefault()
    if (!props.detail) {
        console.log('====================================');
    console.log(html);
    console.log('===================================='); 
      render(<TweetReply tweet={props.tweet} 
      profile= {tweet._creator}/>,
        document.getElementById('dialog')
        )
    }
  }

  if (props.detail) {
    tweetClass = 'tweet detail'
  } else {
    tweetClass = tweet.isNew ? 'tweet fadeIn animated' : 'tweet'
  }

  return (
    <article
      className={tweetClass}
      id={`tweet-${tweet._id}`}
      onClick={props.detail ? '' : handleClick}
    >
      <img src={tweet._creator.avatar} className="tweet-avatar" />
      <div className="tweet-body">
        <div className="tweet-user">
          <Link to={`/${tweet._creator.userName}`}>
            <span className="tweet-name" data-ignore-onclick>
              {tweet._creator.name}
            </span>
          </Link>
          <span className="tweet-username">@{tweet._creator.userName}</span>
        </div>
        <p className="tweet-message">{tweet.message}</p>
        {tweet.image != null ? (
          <img className="tweet-img" src={tweet.image} />
        ) : (
          ''
        )}

        <div className="tweet-footer">
          <a
            className={tweet.liked ? 'like-icon liked' : 'like-icon'}
            onClick={handleLike}
            data-ignore-onclick
          >
            dale like
            <i
              className="fa fa-heart "
              aria-hidden="true"
              data-ignore-onclick
            ></i>
            {tweet.likeCounter}
          </a>
          {!props.detail ? (
            <a className="reply-icon" data-ignore-onclick
            onClick={handleReply}
            >
              <i
                className="fa fa-reply "
                aria-hidden="true"
                data-ignore-onclick
              ></i>
              replyss
              {tweet.replys}
            </a>
          ) : (
            ''
          )}
        </div>
      </div>
      <div id={`tweet-detail-${tweet._id}`} />
    </article>
  )
}

Tweet.propTypes = {
    tweet: PropTypes.object.isRequired,
    detail: PropTypes.bool,
  }
  
  Tweet.defaultProps = {
    detail: false,
  }