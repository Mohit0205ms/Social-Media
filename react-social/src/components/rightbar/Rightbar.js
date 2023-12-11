import { Remove, SportsMma } from "@material-ui/icons";
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([])
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id)
                setFriends(friendList.data);
            } catch (err) {
                console.log(err)
            }
        };
        getFriends();
    }, [user]);

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollowed(!followed);
        } catch (err) {
        }
    }

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/gift.png" alt="" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
                    </span>
                </div>
                <img className="rightbarAd" src="/assets/ad.png" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }
    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbaInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbaInfoItem">
                        <span className="rightbarInfoKey">From</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbaInfoItem">
                        <span className="rightbarInfoKey">Relationship</span>
                        <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "Not Specified"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">

                    <div className="rightbarFollowing">
                        <img className="rightbarFollowingImg" src={`${PF}person/1.jpeg`} alt="" />
                        <span className="rightbarFollowingName">john Carter</span>
                    </div>
                    {/* <div className="rightbarFollowing">
                    <img className="rightbarFollowingImg" src={`${PF}person/2.jpeg`} alt=""/>
                    <span className="rightbarFollowingName">john Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img className="rightbarFollowingImg" src={`${PF}person/3.jpeg`} alt=""/>
                    <span className="rightbarFollowingName">john Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img className="rightbarFollowingImg" src={`${PF}person/4.jpeg`} alt=""/>
                    <span className="rightbarFollowingName">john Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img className="rightbarFollowingImg" src={`${PF}person/5.jpeg` }alt=""/>
                    <span className="rightbarFollowingName">john Carter</span>
                </div>
                <div className="rightbarFollowing">
                    <img className="rightbarFollowingImg" src={`${PF}person/6.jpeg` }alt=""/>
                    <span className="rightbarFollowingName">john Carter</span>
                </div> */}
                </div>
            </>
        );
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
        //<ProfileRightbar/>
    );
}