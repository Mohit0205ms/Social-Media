import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const username = useRef();
    const Navigate = useNavigate();


    const handleClick = async (e)=>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!")
        }else{
            const user = {
                username : username.current.value,
                email : email.current.value,
                password : password.current.value
            }
            try{
                await axios.post("/auth/register",user);
                Navigate("/login");
            }
            catch(err){
                console.log(err);
                console.log("error in register in handleclick function");
            }
        }
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">NAJARE</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on NAJARE
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Username" required ref={username} type="text" className="loginInput" />
                        <input placeholder="Email" required ref={email}  type="email" className="loginInput" />
                        <input placeholder="Password" required ref={password}  className="loginInput" type="password" minLength="6" />
                        <input placeholder="Confirm Password" required ref={passwordAgain}  className="loginInput" type="password" minLength="6" />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton">
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}