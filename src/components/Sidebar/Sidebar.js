import { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ page }) => {
    return (
        <div className="side-bar">
            <div className="side-navbar ms-3">
                {(page === "home") ? (
                    <div className="navbar-tab-selected d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_home_selected.png"></img></span>
                        <span className="sidebar-tab-selected"><a href="/">Головна</a></span>
                    </div>
                ) : (
                    <div className="navbar-tab d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_home.png"></img></span>
                        <span className="sidebar-tab"><a href="/">Головна</a></span>
                    </div>
                )}
                {(page === "likes") ? (
                    <div className="navbar-tab-selected d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_likes_selected.png"></img></span>
                        <span className="sidebar-tab-selected"><a href="/">Вподобання</a></span>
                    </div>
                ) : (
                    <div className="navbar-tab d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_likes.png"></img></span>
                        <span className="sidebar-tab"><a href="/">Вподобання</a></span>
                    </div>
                )}
                {(page === "contributions") ? (
                    <div className="navbar-tab-selected d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_contributions_selected.png"></img></span>
                        <span className="sidebar-tab-selected"><a href="/">Мої внески</a></span>
                    </div>
                ) : (
                    <div className="navbar-tab d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_contributions.png"></img></span>
                        <span className="sidebar-tab"><a href="/">Мої внески</a></span>
                    </div>
                )}
                {(page === "notifications") ? (
                    <div className="navbar-tab-selected d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_notifications_selected.png"></img></span>
                        <span className="sidebar-tab-selected"><a href="/">Сповіщення</a></span>
                    </div>
                ) : (
                    <div className="navbar-tab d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_notifications.png"></img></span>
                        <span className="sidebar-tab"><a href="/">Сповіщення</a></span>
                    </div>
                )}
                {(page === "myprofile") ? (
                    <div className="navbar-tab-selected d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_myprofile_selected.png"></img></span>
                        <span className="sidebar-tab-selected"><a href="/">Мій профіль</a></span>
                    </div>
                ) : (
                    <div className="navbar-tab d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_myprofile.png"></img></span>
                        <span className="sidebar-tab"><a href="/">Мій профіль</a></span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;