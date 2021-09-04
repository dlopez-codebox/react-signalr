import React, { useState } from "react";

const ChatInput = (props) => {
  const [user, setUSer] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

props.sendMessage(user,message);


  };

  const onUserUpdate =(e)=>{
setUSer(e.target.value);
    
  }
  const onMessageUpdate =(e)=>{

    setMessage(e.target.value);
}
  return(
  <form onSubmit={onSubmit}>
    <label htmlFor="user">User:</label>
    <br/>
<input  type="text" id="user" name="user" value={user} onChange={onUserUpdate}/>
<br/>
<label htmlFor="message">Message:</label>
<br/>
<input type="text" id="message" name="message" value={message} onChange={onMessageUpdate}/>
<br/><br/>
<button>Submit</button>


  </form>);
};

export default ChatInput;
