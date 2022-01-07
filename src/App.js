import { Login } from './Login'
import { Signup } from './Signup'

import { BrowserRouter, Route, Routes, IndexRouteProps } from 'react-router-dom'
import { TwitterApp } from './TwitterApp'

import UserPage from './UserPage'
import MyTweets from './MyTweets'
import Followings from './Followings'
import Followers from './Followers'
import TweetDetail from './TweetDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TwitterApp />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path=":user" element={<UserPage />}>
          <Route path="tweets" element={<MyTweets />} />
          <Route path="followers" element={<Followers />} tab="followers" />
          <Route path="following" element={<Followings />} tab="following" />
          <Route path=":tweet" element={<TweetDetail/>}/>
        </Route>
        <Route index element={<div>Default Page Content</div>} />
      </Routes>
    </BrowserRouter>
  )
}
