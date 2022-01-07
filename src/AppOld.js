import React, { useState, useEffect } from 'react'

import APIInvoker from './utils/APIInvoker'
import TweetsContainer from './TweetsContainer'
import { FormTest } from './FormTest'

function App() {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    let params = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    }

    APIInvoker.invoke(
      '/tweets/test',
      (response) => {
        setTweets(response.body)
      },
      (error) => {
        console.log('Error al cargar los Tweets', error)
      },
      params
    )
  }, [])
  console.log(tweets)
  return (
    <div>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet._id}>
            {tweet._creator.name}: {tweet.message}
          </li>
        ))}
      </ul>
      <div className="container">
        <FormTest/>
        <TweetsContainer />
      </div>
    </div>
  )
}

export default App
