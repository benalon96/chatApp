import react ,{useContext} from "react";
import {AuthContext}from "../context/auth"
import {Redirect,Route,Navigate} from 'react-router-dom'; 
const PrivateRoute = ({component:Component,...rest})=>{
     const {user}=useContext(AuthContext);
    return(
        <Route
        {...rest}
        exact
        render={(props)=>
        user?<component {...props}/>:<Navigate to="/login"/>
    }
        />
      

    )
}
export default PrivateRoute;