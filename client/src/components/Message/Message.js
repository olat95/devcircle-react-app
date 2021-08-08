import React from 'react'
import './Message.css'
import Emoji from 'react-emoji'

function Message ({ message: { user, text }, name }) {
  let sentByCurrentUser = false

  const trimmedName = name.trim().toLowerCase()

  if (user === trimmedName) {
    sentByCurrentUser = true
  }

  const option2 = (
    <div className='messageContianer justifyStart'>
      <div className='messageBox backgroundLight'>
        <p className='messageText colorDark'>{Emoji.emojify(text)}</p>
      </div>
      <p className='sentText pl-10'>{user}</p>
    </div>
  )

  const option1 = (
    <div className='messageContianer justifyEnd'>
      <p className='sentText pr-10'>{trimmedName}</p>
      <div className='messageBox backgroundBlue'>
        <p className='messageText colorWhite'>{Emoji.emojify(text)}</p>
      </div>
    </div>
  )

  return sentByCurrentUser ? option1 : option2
}

export default Message
