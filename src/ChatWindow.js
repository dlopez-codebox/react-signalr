import Message from './Message'
import React from 'react'

const  ChatWindow=props=> {

const chat = props.chat.map(m=><Message key={Date.now()*Math.random()} user={m.user} message={m.message}/>)



    return (
        <div>
            {chat}
        </div>
    )
}

export default ChatWindow
