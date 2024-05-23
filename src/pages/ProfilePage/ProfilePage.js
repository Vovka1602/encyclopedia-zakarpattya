import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

const ProfilePage = () => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("def");
    const [avatar, setAvatar] = useState("./image/avatars/0.png");
    const [email, setEmail] = useState("");
    const [likesCount, setLikesCount] = useState(0);
    const [contributionsCount, setContributionsCount] = useState(0);
    const [adminAccess, setAdminAccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username === "" || username === null) {
            navigate("/login");
            console.log("Login first");
        }
    }, [navigate]);

    useEffect(() => {
        fetch("http://localhost:8000/users/" + sessionStorage.getItem("username"))
            .then(res => res.json())
            .then(userdata => {
                setId(userdata.id);
                setFullName(userdata.fullname);
                setAvatar(userdata.avatar);
                setEmail(userdata.email);
                setAdminAccess(userdata.admin_access);
            });
    });

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        let likesCount = 0;
        let contributionsCount = 0;
        fetch("http://localhost:8000/locations/")
            .then(res => res.json())
            .then(locations => {
                for (let location of locations) {
                    if (location.author === username) {
                        contributionsCount++;
                    }
                    if (location.users_liked.includes(username)) {
                        likesCount++;
                    }
                }
                setContributionsCount(contributionsCount);
                setLikesCount(likesCount);
            });
    }, []);

    return (
        <div className="row">
            <title>Мій профіль - Енциклопедія Закарпаття</title>
            <div className="col-3 px-0">
                <Sidebar page={"myprofile"} />
            </div>
            <div className="col-8 px-0">
                <Header title="Мій профіль" />
                <div className="container">
                    <div className="page mt-3 mb-0">
                        <div className="profile-container">
                            <div className="avatar-container">
                                <img className="rounded-circle" src={avatar} alt=""></img>
                            </div>
                            <div className="editprofile">
                                <a href="/editprofile">
                                    <button className="btn btn-outline-secondary rounded-pill px-5 fs-5">Редагувати профіль</button>
                                </a>
                            </div>
                        </div>
                        <div className="profile-info">
                            <div className="d-flex">
                                <h2>{fullName}</h2>
                                {adminAccess ? (
                                    <div>
                                        <h1 className="admin-sign mt-2 ms-4">Адміністратор</h1>
                                    </div>
                                ) : (<></>)}
                            </div>
                            <h3>{id}</h3>
                            <p className="email">
                                <img src="./Images/Icons/profile_email.png" alt=""></img>
                                {email}
                            </p>
                            <p className="likes">
                                <img className="mb-2" src="./Images/Icons/profile_likes.png" alt=""></img>
                                Локацій у списку бажаного: <strong>{likesCount}</strong>
                            </p>
                            {!adminAccess ? (
                                <p className="contributions mt-3">
                                <img className="mb-2" src="./Images/Icons/profile_contributions.png" alt=""></img>
                                Зроблено внесків: <strong>{contributionsCount}</strong>
                            </p>
                            ) : (<></>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
