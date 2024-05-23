import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationsList from "../../components/LocationsList/LocationsList";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import "./HomePage.css";

const HomePage = () => {
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username === '' || username === null) {
            navigate('/welcome');
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
            let filtered = data.filter(location => location.status === "accepted");
            setFilteredData(filtered);
        }
    }, [data]);

    return (
        <div className="row">
            <title>Головна - Енциклопедія Закарпаття</title>
            <div className="col-3 px-0">
                <Sidebar page={"home"} />
            </div>
            <div className="col-8 px-0">
                <Header title="Головна" />
                <div className="container">
                    <div className="page">
                        <div>
                            {filteredData && <LocationsList data={filteredData} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;