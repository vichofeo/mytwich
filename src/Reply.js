import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import config from './utils/config'

export default function Reply(props) {
  const [replyBox, setReplyBox] = useState({
    focus: false,
    message: '',
    image: null,
  })
  let randomID = uuidv4()

  const tAreaElement = useRef()

  const resetBox = () => {
    const reply = tAreaElement.current
    setReplyBox({ focus: false, message: '', image: null })
    reply.blur()
  }
  const messageOnkeyEsc = (e) => {
    if (e.keyCode === 27) {
      resetBox()
    }
  }
  const messageFocusLost = (e) => {
    if (replyBox.message.length === 0) {
      resetBox()
    }
  }
  const messageFocus = (e) => {
    setReplyBox({...replyBox, focus: true })
  }

  const messageChange = (e) => {
    setReplyBox({...replyBox, message: e.target.value })
  }

  const imageSelect = (e) => {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]
    if (file.size > 1240000) {
      alert('el archivode imagen supera el maximo de 1 MB')
      return
    }
    reader.onloadend = () => {
      setReplyBox({...replyBox, image: reader.result })
    }
    reader.readAsDataURL(file)
  }

  const newTweet = (e) => {
    e.preventDefault()
    let tweet = {
      _id: uuidv4(),
      _creator: {
        _id: props.profile._id,
        name: props.profile.name,
        userName: props.profile.userName,
        avatar: props.profile.avatar,
      },
      date: Date.now,
      message: replyBox.message,
      image: replyBox.image,
      liked: false,
      likeCounter: 0,
    }
    props.operations.addNewTweet(tweet)
    resetBox()
  }

  return (
    <section className="reply">
      
      {props.profile != null && <img src={props.profile.avatar} className="reply-avatar" />}
      <div className="reply-body">
        <textarea
          ref={tAreaElement}
          name="message"
          type="text"
          maxLength={config.tweets.maxTweetSize}
          placeholder="¿Qué está pensando?"
          className={replyBox.focus ? 'reply-selected' : ''}
          value={replyBox.message}
          onKeyDown={messageOnkeyEsc}
          onBlur={messageFocusLost}
          onFocus={messageFocus}
          onChange={messageChange}
        />

        
        {replyBox.image != null && <div className="image-box">
                <img src={replyBox.image} />
              </div>}
      </div>
      <div className={replyBox.focus ? 'reply-controls' : 'hidden'}>
        <label
          htmlFor={`reply-camara-${randomID}`}
          className={
            replyBox.message.length === 0 ? 'btn pull-left disabled'
            : 'btn pull-left'
          }
        >
          <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
        </label>

        <input
          href="#"
          className={
            replyBox.message.length === 0 ? 'btn pull-left disabled' : 'btn pull-left'
          }
          accept=".gif,.jpg,.jpeg,.png"
          type="file"
          onChange={imageSelect}
          id={`reply-camara-${randomID}`}
        ></input>

        <span className="char-counter">
          {config.tweets.maxTweetSize - replyBox.message.length} 
        </span>

        <button
          className={
            replyBox.message.length === 0
              ? 'btn btn-primary disabled'
              : 'btn btn-primary '
          }
          onClick={newTweet}
        >
          <i className="fa fa-twitch" aria-hidden="true"></i> Twittear
        </button>
      </div>
    </section>
  )
}

Reply.propTypes = {
  profile: PropTypes.object,
  operations: PropTypes.object.isRequired,
}
