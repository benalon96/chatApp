import React,{useContext} from "react";
import { Link } from "react-router-dom";
import{auth,db}from"../firebase";
import Img from "../image1.png";
import{signOut} from"firebase/auth";
import { updateDoc,doc } from "@firebase/firestore";
import {AuthContext}from "../context/auth"
import { useNavigate } from 'react-router-dom'; 
const Nevbar = () => {
  const navigate = useNavigate();
  const {user}=useContext(AuthContext)
  const handleSignOut=async () => {
     await updateDoc(doc(db,'users',auth.currentUser.uid), {
                isOnline:false,
            });
     await signOut(auth);  
     navigate('/login')     
  }
    return(
    <nav>


      <h3>
         <Link className="btn" to="/">Chat App</Link>
      </h3>
      <div>
        {user ?
        <>
          <Link className="btn" to="/profile">Profile</Link>
          <button className="btn" onClick={handleSignOut}>Logout</button>
         
        </>:
         <>
          <Link className="btn" to="/register">Register</Link>
          <Link className="btn" to="/login">Login</Link>
         </>
      }
           
      </div>
        
    </nav>

    );
};
export default Nevbar