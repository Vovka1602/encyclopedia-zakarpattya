import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationsList from "../../components/LocationsList/LocationsList";
import Sidebar from "../../components/Sidebar/Sidebar";

const HomePage = () => {
    const [data, setData] = useState(null);

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


    return (
        <div className="row">
            <title>Головна</title>
            <div className="col-3 px-0">
                <Sidebar page={"home"}/>
            </div>
            <div className="col px-0">
                <div className="container">
                    <h1>Головна</h1>
                    <a href="/welcome">Вийти</a>
                    <div>
                        {data && <LocationsList data={data} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;