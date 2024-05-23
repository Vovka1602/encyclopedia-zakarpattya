import { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ page }) => {
    const [id, setId] = useState("");
    const [fullname, setFullname] = useState("");
    const [avatar, setAvatar] = useState("./image/avatars/1.png");
    const [adminAccess, setAdminAccess] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8000/users/" + sessionStorage.getItem("username"))
            .then(res => res.json())
            .then(userdata => {
                setId(userdata.id);
                setFullname(userdata.fullname);
                setAvatar(userdata.avatar);
                setAdminAccess(userdata.admin_access);
            });
    })

    return (
        <div className="side-bar">
            <div className="side-navbar ms-3">
                <div className="logo-container">
                    <img src="./Images/logo_large.png" alt="Logo"></img>
                </div>
                {(page !== "welcome") ? (
                    <div>
                        {(page === "home") ? (
                            <div className="navbar-elem-selected d-flex align-items-center rounded-pill px-4">
                                <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_home_selected.png" alt=""></img></span>
                                <span className="sidebar-tab-selected"><a href="/">Головна</a></span>
                            </div>
                        ) : (
                            <div className="navbar-elem d-flex align-items-center rounded-pill px-4">
                                <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_home.png" alt=""></img></span>
                                <span className="sidebar-tab"><a href="/">Головна</a></span>
                            </div>
                        )}
                        {(page === "likes") ? (
                            <div className="navbar-elem-selected d-flex align-items-center rounded-pill px-4">
                                <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_likes_selected.png" alt=""></img></span>
                                <span className="sidebar-tab-selected"><a href="/likes">Вподобання</a></span>
                            </div>
                        ) : (
                            <div className="navbar-elem d-flex align-items-center rounded-pill px-4">
                                <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_likes.png" alt=""></img></span>
                                <span className="sidebar-tab"><a href="/likes">Вподобання</a></span>
                            </div>
                        )}
                        {!adminAccess ? (
                            <div>
                                {(page === "contributions") ? (
                                    <div className="navbar-elem-selected d-flex align-items-center rounded-pill px-4">
                                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_contributions_selected.png" alt=""></img></span>
                                        <span className="sidebar-tab-selected"><a href="/contributions">Внески</a></span>
                                    </div>
                                ) : (
                                    <div className="navbar-elem d-flex align-items-center rounded-pill px-4">
                                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_contributions.png" alt=""></img></span>
                                        <span className="sidebar-tab"><a href="/contributions">Внески</a></span>
                                    </div>
                                )}
                            </div>
                        ) : (<></>)}
                        {(page === "myprofile") ? (
                            <div className="navbar-elem-selected d-flex align-items-center rounded-pill px-4">
                                <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_myprofile_selected.png" alt=""></img></span>
                                <span className="sidebar-tab-selected"><a href="/myprofile">Профіль</a></span>
                            </div>
                        ) : (
                            <div className="navbar-elem d-flex align-items-center rounded-pill px-4">
                                <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_myprofile.png" alt=""></img></span>
                                <span className="sidebar-tab admin"><a href="/myprofile">Профіль</a></span>
                            </div>
                        )}
                        {adminAccess ? (
                            <div className="mt-5">
                                {(page === "moderation") ? (
                                    <div className="navbar-elem-selected d-flex align-items-center rounded-pill px-4">
                                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_admin_moderation_selected.png" alt=""></img></span>
                                        <span className="sidebar-tab-admin-selected"><a href="/moderation">Модерація</a></span>
                                    </div>
                                ) : (
                                    <div className="navbar-elem d-flex align-items-center rounded-pill px-4">
                                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_admin_moderation.png" alt=""></img></span>
                                        <span className="sidebar-tab-admin"><a href="/moderation">Модерація</a></span>
                                    </div>
                                )}
                                {(page === "administering") ? (
                                    <div className="navbar-elem-selected d-flex align-items-center rounded-pill px-4">
                                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_admin_administering_selected.png" alt=""></img></span>
                                        <span className="sidebar-tab-admin-selected"><a href="/administering">Адміністрування</a></span>
                                    </div>
                                ) : (
                                    <div className="navbar-elem d-flex align-items-center rounded-pill px-4">
                                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_admin_administering.png" alt=""></img></span>
                                        <span className="sidebar-tab-admin"><a href="/administering">Адміністрування</a></span>
                                    </div>
                                )}
                            </div>
                        ) : (<></>)}
                        <a href="/welcome">
                            <button className="btn btn-outline-primary btn-lg rounded-pill px-3 py-3 fs-4 mt-4">Вийти</button>
                        </a>
                    </div>
                ) : (
                    <div className="mt-4">
                        <a href="/login">
                            <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 fs-4">Увійти</button>
                        </a>
                        <a href="/signup">
                            <button className="btn btn-outline-primary btn-lg rounded-pill px-3 py-3 fs-4 mt-3">Зареєструватися</button>
                        </a>
                    </div>
                )}
            </div>
            {(page !== "welcome") ? (
                <div>
                    {adminAccess ? (
                        <div className="sidebar-userdata-admin">
                            <span><img className="rounded-circle" src={avatar} alt=""></img></span>
                            <span>
                                <div>
                                    <h2 className="fs-4">{fullname}</h2>
                                </div>
                                <div>
                                    <h3 className="fs-5">{id}</h3>
                                </div>
                            </span>
                        </div>
                    ) : (
                        <div className="sidebar-userdata">
                            <span><img className="rounded-circle" src={avatar} alt=""></img></span>
                            <span>
                                <div>
                                    <h2 className="fs-4">{fullname}</h2>
                                </div>
                                <div>
                                    <h3 className="fs-5">{id}</h3>
                                </div>
                            </span>
                        </div>
                    )}
                </div>
            ) : (<></>)}
        </div>
    );
}

export default Sidebar;