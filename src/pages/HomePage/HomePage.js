import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username === '' || username === null) {
            navigate('/welcome');
        }
    }, []);

    return ( 
        <div className="container">
            <h1>Головна</h1>
            <a href="/welcome">Вийти</a>
        </div>
    );
}
 
export default HomePage;