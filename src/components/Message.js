import React, {useRef,useEffect,scrollRef,} from "react";
import Moment from "react-moment";

const Message=({msg,userOne})=>{
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

    useEffect(() => {
    scrollToBottom()
    }, [msg]);
//      useEffect(() => {
//         scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [msg]);
    return(
        <div className={`message_wrapper ${msg.from===userOne?"own":""}`}
        ref={messagesEndRef}>
            <p className={msg.from === userOne ? "me" : "friend"} >
                
                {msg.media?<img src={msg.media}alt={msg.text}/>:null}
                {msg.text}
                <br/>
                <small>
                    <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                </small>
            </p>
        </div>
    );
};
export default Message;