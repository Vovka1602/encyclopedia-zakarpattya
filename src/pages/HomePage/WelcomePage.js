import { useEffect, useState } from "react";
import WelcomeList from "../../components/LocationsList/WelcomeList";

const WelcomePage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    useEffect(() => {
        fetch("http://localhost:8000/locations")
            .then(res => res.json())
            .then(response => {
                setData(response);
            });
    }, []);

    return ( 
        <div className="container">
            <title>Ласкаво просимо</title>
            <h1>Ласкаво просимо</h1>
            <a href="/login">Увійти</a>
            <div>
                {data && <WelcomeList data={data}/>}
            </div>
        </div>
    );
}
 
export default WelcomePage;