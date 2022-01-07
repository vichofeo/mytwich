import React, { useState, useEffect } from 'react'
import APIInvoker from './utils/APIInvoker'
import PropTypes from 'prop-types'
import Tweet from './Tweet'
import Reply from './Reply'

export default function TweetsContainer(props) {
  const [tweets, setTweets] = useState([])
  

  useEffect(() => {
    let username = props.profile.username
    let onlyUserTweet = props.onlyUserTweet
    loadTweets(username, onlyUserTweet)
  }, [])

  const loadTweets = (username, onlyUserTweet) => {
    onlyUserTweet = onlyUserTweet ? `/${username}` : ''
    let url = `/tweets${onlyUserTweet}`
    APIInvoker.invokeGET(
      url,
      (res) => {
        setTweets(res.body)
      },
      (error) => {
        console.log('error al cargar los tweets', error)
      }
    )
  }

  const addNewTweet = (newTweet) => {
    let oldState = tweets    
    let newState = tweets    
    newState.unshift(newTweet)
    setTweets([newTweet])
    
    
    
        //add newtweet
   APIInvoker.invokePOST(
      '/secure/tweet',
      newTweet,
      (res) => {
        newState[0] = {...newState[0], _id: res.tweet._id}
        setTweets(newState)
        console.log('cagado exitowosooo')
        
      },
      (err) => {
        console.log('error al cargar los Tweets')
        setTweets(oldState)
      }
    )
  }

  let operations = {
    addNewTweet: addNewTweet.bind(this),
  }
  return (
    <main className="twitter-panel">
      {(() => {
        if (props.onlyUserTweet) {
          return <div className="tweet-container-header">TweetsDD</div>
        } else {
          return <Reply profile={props.profile} operations={operations} />
        }
      })()}
      {tweets != null
        ? tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet}></Tweet>)
        : ''}
    </main>
  )
}



