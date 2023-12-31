import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
export default function Profile(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState({});
    const username = useParams().username;

    useEffect(()=>{
        const fetchUser = async ()=>{
            const res= await axios.get(`/users/?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    },[username])

    return(
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src={user.coverPicture? PF+user.coverPicture : PF+"person/noCover.png"} alt={user.coverPicture? "check internet connection" : "their is not cover picture" }/>
                            <img className="profileUserImg" src={user.profilePicture? PF+user.profilePicture : PF+"person/noAvatar.png"} alt={user.profilePicture? "check internet connection" : "thier is not any profile picture" }/>
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}