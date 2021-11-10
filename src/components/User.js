import React,{useEffect,useState} from "react";
import { onSnapshot,doc } from "@firebase/firestore";
import Img from '../image1.png'
import{db, storage}from'../firebase'
const User=({userOne,user,selectUser,chat})=>{
    const userTwo=user?.uid;
    const[data,setData]=useState('');
    useEffect(()=>{
        const id=userOne>userTwo?`${userOne+userTwo}`:`${userTwo+userOne}`
        let unsub=onSnapshot(doc(db,"lastMsg",id),(doc)=>{
            setData(doc.data());
            

        });
        return ()=>unsub()
    }, []);
     console.log(data);
    
return(
    <>
<div className={`user_wrapper ${chat.uid===user.uid && "selected_user"}`}
        onClick={()=>selectUser(user)}
>
    <div className="user_info">
        <div className="user_detail">
            <img src={user.avatar||Img} alt="avatar" className="avatar"/>
            <h4>{user.name}</h4>
            {data?.from !==userOne&&data?.unread&&<small className="unread" >New</small>}
        </div>
        <div className={`user_status ${user.isOnline ? "online":"offline"}`}
        ></div>
    </div>
     {data && (
         
          <p className="truncate">
              <strong>{data.from===userOne ? 'Me: ':null}</strong>
            {data.text}
          </p>
        )}
         <hr/>
    </div>
//     <div onClick={()=>selectUser(user)} className={`sm_container ${chat.uid===user.uid && "selected_user"}`}>
//         <img src={user.avatar||Img} alt="avatar" className="avatar sm_screen"/>
//     </div>
   </>  


)

}
export default User;
