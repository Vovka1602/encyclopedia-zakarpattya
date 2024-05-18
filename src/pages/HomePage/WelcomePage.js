import { useEffect, useState } from "react";
import WelcomeList from "../../components/LocationsList/WelcomeList";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const WelcomePage = () => {
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);

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

    useEffect(() => {
        if (data !== null) {
            let filtered = data.filter(location => location.status === "accepted");
            setFilteredData(filtered);
        }
    }, [data]);

    return (
        <div className="row">
            <title>Ласкаво просимо</title>
            <div className="col-3 px-0">
                <Sidebar page={"welcome"} />
            </div>
            <div className="col-8 px-0">
                <Header title="Ласкаво просимо" />
                <div className="container">
                    <title>Ласкаво просимо</title>
                    <div className="page">
                        <div>
                            {filteredData && <WelcomeList data={filteredData} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;