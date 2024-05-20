import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationsList from "../../components/LocationsList/LocationsList";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import ModerationsList from "../../components/LocationsList/ModerationsList";

const ModerationPage = () => {
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
            let filtered = data.filter(location => location.status === "pending");
            setFilteredData(filtered);
        }
    }, [data]);

    return ( 
        <div className="row">
            <title>Модерація</title>
            <div className="col-3 px-0">
                <Sidebar page={"moderation"} />
            </div>
            <div className="col-8 px-0">
                <Header title="Модерація пропозицій" />
                <div className="container">
                    <div className="page">
                        <div>
                            {filteredData && <ModerationsList data={filteredData} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ModerationPage;