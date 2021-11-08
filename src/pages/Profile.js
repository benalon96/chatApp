import {useState,useEffect} from "react";
import Camera from "../components/svg/Camera";
import Img from "../image1.png";
import{storage,db,auth} from "../firebase";
import{ref,getDownloadURL,uploadBytes,deleteObject} from "firebase/storage";
import {getDoc,doc,updateDoc}from "@firebase/firestore"
import Delete from "../components/svg/Delete";
import {useNavigate} from "react-router-dom"
const Profile = ()=>{
const [img,setImg]=useState('')
const [user,setUser]=useState()
const navigate = useNavigate();

  useEffect(() => {
  const unsub = auth.onAuthStateChanged((authObj) => {
    unsub();
    if (authObj) {
      // logged in, use authObj
      getDoc(doc(db,"users",auth.currentUser.uid)).then ((docSnap)=>{
        if(docSnap.exists){
          setUser(docSnap.data());  
        }
        
    });
       
    if(img){
        const uploadImg =async() => {
            const imgRef=ref(
                storage,
                `avatar/${new Date().getTime()} - ${img.name}`
                );
                try{
                   if(user.avatarPath) {
                       await deleteObject(ref(storage,user.avatarPath));
                   }
                const snap= await uploadBytes(imgRef,img)
                const url=await getDownloadURL(ref(storage,snap.ref.fullPath))
                 await updateDoc(doc(db,"users",auth.currentUser.uid),{
                    avatar:url,
                    avatarPath:snap.ref.fullPath,
                     });
                setImg("");
                console.log(snap.ref.fullPath)
                console.log(url)
                alert("photo upload successful!")
                }catch(err){
                console.log(err.message);
 
                }
            
        }
        uploadImg();
    }
    } else {
      // not logged in
    }
  });
}, [img]); 
const deleteImage=async()=>{
    try{    
        const confirm=window.confirm('Delete photo?')
        if(confirm){
           await deleteObject(ref(storage,user.avatarPath)) 
           await updateDoc(doc(db,'users',auth.currentUser.uid),{
               avatar:"",
               avatarPath:"",
           });
           navigate("/");
        }
    }
    catch(err){
    console.log(err.message);
    }
} 
return user? (<section>  
<div className="profile_container">
    <div className="img_container" >
        <img src={user.avatar||Img}alt="avatar"/>
        <div className="overlay">
         <div>
             <label htmlFor="photo">
                <Camera/> 
            </label> 
            {user.avatar? <Delete deleteImage={deleteImage}/> : null}
            <input type="file" accept="image/*" style={{display:"none"}}id="photo" onChange={e=>setImg(e.target.files[0])}/>
         </div>
        </div>
    </div>
    <div className="text_container">
    <h3>{user.name}</h3>
    <hr/>
    <p>{user.email}</p>
    <hr/>
    <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
    <hr/>
    </div>
</div>
</section>
):null

}
export default Profile;