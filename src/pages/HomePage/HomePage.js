import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationsList from "../../components/LocationsList/LocationsList";

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
        <div className="container">
            <h1>Головна</h1>
            <a href="/welcome">Вийти</a>
            <div>
                {data && <LocationsList data={data}/>}
            </div>
        </div>
    );
}
 
export default HomePage;