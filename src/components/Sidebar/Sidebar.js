import "./Sidebar.css";

const Sidebar = () => {
    return ( 
        <div className="side-bar">
            <div className="side-navbar ms-3">
                <div className="d-flex align-items-center rounded-pill px-4 py-3">
                    <span><a href="/">Головна</a></span>
                </div>
                <div className="d-flex align-items-center rounded-pill px-4 py-3">
                    <span><a href="/">Вподобання</a></span>
                </div>
                <div className="d-flex align-items-center rounded-pill px-4 py-3">
                    <span><a href="/">Мої внески</a></span>
                </div>
                <div className="d-flex align-items-center rounded-pill px-4 py-3">
                    <span><a href="/">Сповіщення</a></span>
                </div>
                <div className="d-flex align-items-center rounded-pill px-4 py-3">
                    <span><a href="/">Мій профіль</a></span>
                </div>
            </div>
        </div>
    );
}
 
export default Sidebar;