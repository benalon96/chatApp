import React,{useState} from "react";
import{signInWithEmailAndPassword}from "firebase/auth"
import { auth,db } from "../firebase";
import { doc,updateDoc,getDoc } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
    const [data,setData]=useState({
        email:"",
        password:"",
        error:null,
        loading:false,
    })
    const [user,setUser]=useState()
    const navigate = useNavigate();
    const{email,password,error,loading}=data;
    const handleChange=(e)=> {
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit=async (e)=> {
        e.preventDefault();
        setData({...data,error: null,loading: true})
        if(!email||!password){
          setData({...data,error:"All fields are required"})  
        }
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
                )
           
            console.log(result.user)
           getDoc(doc(db,"users",auth.currentUser.uid)).then ((docSnap)=>{
            if(docSnap.exists){
          setUser(docSnap.data());  
        } 
        });
            await updateDoc(doc(db,'users',result.user.uid), {
                isOnline:true,
            });
            alert("Welcome back "+ user.name);
            // console.log(db)

            setData({email:'',password:'',error:null,loading:false}); 
             navigate('/')
    }
        catch(err) {
            setData({...data,error:err.massage,loading:false})
            alert("One of the details you entered is incorrect. Please try again!")
            
        }
        
    }

    return(
    <section>
       <h3>Login into your Account</h3> 
       <form className="form" onSubmit={handleSubmit}>
           <div className="input_container">
              <label htmlFor="email">Email</label> 
              <input type="text"name="email" value={email} onChange={handleChange}></input>
           </div>
           <div className="input_container">
              <label htmlFor="password">Password</label> 
              <input type="password"name="password" value={password} onChange={handleChange}></input>
           </div>
           {error?<p className="error">{error}</p>:null}
           <div className="btn_container">
            <button className="btn" disabled={loading}>{loading?'Logging in...':'Login'}</button>
            
           </div>
       </form>
    </section>

    );
};
export default Login