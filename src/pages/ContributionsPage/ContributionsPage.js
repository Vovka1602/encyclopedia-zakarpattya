import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import ContributionsList from "../../components/LocationsList/ContributionsList";
import "./ContributionsPage.css";

const ContributionsPage = () => {
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [adminAccess, setAdminAccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username === '' || username === null) {
            navigate('/welcome');
        } else {
            fetch("http://localhost:8000/users/" + username)
                .then(res => res.json())
                .then(user => {
                    if (user.admin_access === true) {
                        navigate("/");
                    }
                })
        }
    }, [navigate]);

    useEffect(() => {
        fetch("http://localhost:8000/locations")
            .then(res => res.json())
            .then(response => {
                setData(response);
            });
    }, []);

    useEffect(() => {
        if (data !== null) {
            let filtered = data.filter(location => location.author === sessionStorage.getItem("username"));
            filtered.reverse();
            setFilteredData(filtered);
        }
    }, [data]);

    return (
        <div className="row">
            <title>Внески</title>
            <div className="col-3 px-0">
                <Sidebar page={"contributions"} />
            </div>
            <div className="col-8 px-0">
                <Header title="Мої внески" />
                <div className="container">
                    <div className="page">
                        <div>
                            {filteredData && <ContributionsList data={filteredData} />}
                        </div>
                    </div>
                </div>
                <div className="page-bottom">
                    <div className="button-panel d-flex justify-content-center mt-3 me-5">
                        <a href="/newcontribution">
                            <button className="button-green">
                                <div className="button-content">
                                    <div className="button-icon">
                                        <img src="Images/Icons/plus_green.png" alt=""></img>
                                        <img className="img-hover" src="Images/Icons/plus_black.png" alt=""></img>
                                    </div>
                                    <div className="button-label">Нова пропозиція</div>
                                </div>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContributionsPage;