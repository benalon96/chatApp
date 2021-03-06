import React from "react";
import Attachment from "./svg/Attachment";

const MessageForm = ({handleSubmit,text,setText,setImg,Img}) => {
    return(
<form className="message_form" onSubmit={handleSubmit}>
    <label htmlFor="img" >
        <Attachment />
        </label>
    <input 
        onChange={(e)=>Img ===e.target.files[0]?setImg(""):setImg(e.target.files[0])}
        type="file" 
        id="img"
        accept="image/*"
        style={{display:"none"}}>
      </input>
      <div>
      <input 
      type="text" 
      placeholder="Enter message"
      value={text}
       onChange={e=>setText(e.target.value)}
       ></input>
      </div>
      <div>
          <button className="btn" >Send</button>
          
      </div>
</form>
    )
}
export default MessageForm;
