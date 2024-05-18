import "./Sidebar.css";

const Sidebar = ({ page }) => {
    return (
        <div className="side-bar">
            <div className="side-navbar ms-3">
                {(page === "home") ? (
                    <div className="navbar-tab-selected d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_home_selected.png" alt=""></img></span>
                        <span className="sidebar-tab-selected"><a href="/">Головна</a></span>
                    </div>
                ) : (
                    <div className="navbar-tab d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_home.png" alt=""></img></span>
                        <span className="sidebar-tab"><a href="/">Головна</a></span>
                    </div>
                )}
                {(page === "likes") ? (
                    <div className="navbar-tab-selected d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_likes_selected.png" alt=""></img></span>
                        <span className="sidebar-tab-selected"><a href="/likes">Вподобання</a></span>
                    </div>
                ) : (
                    <div className="navbar-tab d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_likes.png" alt=""></img></span>
                        <span className="sidebar-tab"><a href="/likes">Вподобання</a></span>
                    </div>
                )}
                {(page === "contributions") ? (
                    <div className="navbar-tab-selected d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_contributions_selected.png" alt=""></img></span>
                        <span className="sidebar-tab-selected"><a href="/">Мої внески</a></span>
                    </div>
                ) : (
                    <div className="navbar-tab d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_contributions.png" alt=""></img></span>
                        <span className="sidebar-tab"><a href="/">Мої внески</a></span>
                    </div>
                )}
                {(page === "notifications") ? (
                    <div className="navbar-tab-selected d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_notifications_selected.png" alt=""></img></span>
                        <span className="sidebar-tab-selected"><a href="/">Сповіщення</a></span>
                    </div>
                ) : (
                    <div className="navbar-tab d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_notifications.png" alt=""></img></span>
                        <span className="sidebar-tab"><a href="/">Сповіщення</a></span>
                    </div>
                )}
                {(page === "myprofile") ? (
                    <div className="navbar-tab-selected d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon-selected" src="./Images/Icons/sidebar_myprofile_selected.png" alt=""></img></span>
                        <span className="sidebar-tab-selected"><a href="/">Мій профіль</a></span>
                    </div>
                ) : (
                    <div className="navbar-tab d-flex align-items-center rounded-pill px-4">
                        <span><img className="sidebar-tab-icon" src="./Images/Icons/sidebar_myprofile.png" alt=""></img></span>
                        <span className="sidebar-tab"><a href="/">Мій профіль</a></span>
                    </div>
                )}
                {(page === "welcome") ? (
                    <div className="mt-5">
                        <a href="/login">
                            <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 fs-4">Увійти</button>
                        </a>
                        <a href="/signup">
                            <button className="btn btn-outline-primary btn-lg rounded-pill px-3 py-3 fs-4 mt-3">Зареєструватися</button>
                        </a>
                    </div>
                ) : (
                    <a href="/welcome">
                        <button className="btn btn-outline-primary btn-lg rounded-pill px-3 py-3 fs-4 mt-5">Вийти</button>
                    </a>
                )}
            </div>
        </div>
    );
}

export default Sidebar;