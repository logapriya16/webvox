import React, { useContext, useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import { AuhtContext } from "../../Contexts/AuthContext";
function Login(){
    
    const testUserData={
        username:"loga@1612",
        password:"1612"
    }
    const {Login}=useContext(AuhtContext)
    const [userData,setUserData]=useState({
        username:"",
        password:""
    })
    const handleLogin=()=>{
        if(!userData.username.trim() || !userData.password.trim()){
            toast.warn("Enter all Credentials!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
        }
        else {
            Login(userData)
        }
    }

    const handleTestUserLogin=()=>{
        setUserData(testUserData);
        Login(testUserData);
        
    }

    return (
        <div>
            <div>
                <label htmlFor="username" ></label>
                <input type="login"
                id="username"
                placeholder="Enter your Username"
                value={userData.username}
                onChange={(e)=>setUserData((prevs)=>({...prevs,username:e.target.value}))}
                />
            </div>
            <div>
            <label htmlFor="password" ></label>
                <input type="password"
                id="password"
                placeholder="Enter your password"
                value={userData.password}
                onChange={(e)=>setUserData((prevs)=>({...prevs,password:e.target.value}))}
                />
            </div>
            <div>
                <button onClick={()=>handleLogin()}>Login</button>
                <button onClick={()=>handleTestUserLogin()}>Login As test User</button>
            </div>
            <p><Link to="/signup">Create New Account</Link></p>
        </div>
    )
}
export default Login;