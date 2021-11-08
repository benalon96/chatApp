import React ,{useEffect,useState} from "react";
import {db,auth,storage}from '../firebase'
import User from "../components/User";
import{ref,getDownloadURL,uploadBytes} from "firebase/storage";
import {collection,query,where,onSnapshot,addDoc,Timestamp,orderBy,setDoc,doc,getDoc,updateDoc}from "@firebase/firestore";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";
import Img from '../image1.png'

const Home = () => {
    const [users,setUsers]=useState([]);
    const [chat,setChat]=useState("");
    const [text,setText]=useState('');
    const [img,setImg]=useState("");
    const [msgs,setMsgs]=useState([]);
    var [userOne,setUserOne]=useState('');
    const unsubAuth = auth.onAuthStateChanged((authObj) => {
        unsubAuth();
        if(authObj){
      userOne=auth.currentUser.uid
        }
        setUserOne(userOne);
    });
    useEffect(()=>{
        console.log(db);
        
        const unsubAuth = auth.onAuthStateChanged((authObj) => {
        unsubAuth();
        
        if (authObj) {
        const userRef = collection(db, "users");
        const q=query(userRef,where("uid","not-in",[auth.currentUser.uid]));
        const unSub=onSnapshot(q,querySnapshot=>{
            let users=[];
          querySnapshot.forEach(doc=>{
            users.push(doc.data())
          });  
          setUsers(users);
        });
        return()=>unSub();
            }
        else{

        }
        });
    },[]);
    const selectUser= async(user) =>{
        setChat(user)
        // console.log(user);
        const userTwo=user.uid
        const userOne=auth.currentUser.uid;
        const id2=userOne>userTwo?`${userOne+userTwo}`:`${userTwo+userOne}`
        const msgsRef= collection(db,"messages",id2,"chat")
        const q=query(msgsRef,orderBy("createdAt","asc"))
        onSnapshot(q,querySnapshot=>{
            let msgs=[]
            querySnapshot.forEach((doc) =>{
                msgs.push(doc.data());
            });
           setMsgs(msgs);
        });
       const docSnap= await getDoc(doc(db,"lestMsg",id2))
       //if last message exists..
       if(docSnap.data()&&docSnap.data()?.from!==userOne){
         await updateDoc(doc(db,"lestMsg",id2),{
             unread:false,
         });
       }
         
    };
    console.log(msgs)
    const handleSubmit= async e =>{
        e.preventDefault()
        const userOne=auth.currentUser.uid;
        const userTwo =chat.uid
        const id=userOne>userTwo?`${userOne+userTwo}`:`${userTwo+userOne}`
        let url;
        if(img){
            const imgRef=ref(storage,`images/${new Date()}-${img.name}`
            );
            const snap=await uploadBytes(imgRef,img)
            const dlUrl=await getDownloadURL(ref(storage,snap.ref.fullPath))
            url=dlUrl;

        }

        await addDoc(collection(db,'messages',id,'chat'),{
            text,
            from:userOne,
            to:userTwo,
            createdAt:Timestamp.fromDate(new Date()),
            media:url || "",
        });
        await setDoc(doc(db,'lastMsg',id),{
             text,
            from:userOne,
            to:userTwo,
            createdAt:Timestamp.fromDate(new Date()),
            media:url || "",
            unread:true,
        });
        setText("")
    }
    return(
        <div className="home_container">
            <div className="users_container">{users.map(user=> <User key={user.uid}user={user} selectUser={selectUser} userOne={userOne} chat={chat}/>) }</div>
            <div className="messages_container">
                {chat ?(
                    <>
                 <div className="messages_user">
                    <h3>{chat.name}</h3>
                    
            
                    </div>
                    <div className="messages">
                       {msgs.length
                        ? msgs.map((msg, i) =>
                        <Message key={i} msg={msg} userOne={userOne}/>)
                        :null}

                    </div>
                    
                    <MessageForm handleSubmit={handleSubmit}
                    text={text}
                    setText={setText}
                    setImg={setImg}
                    />
                    </>
                    
                ):(
                   <h3 className='no_conv' >Select a user to start conversation..</h3>
                   
                )}
                
            </div>
        
        </div>

    )

   
}
export default Home