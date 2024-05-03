import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LocationInfoPage = () => {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/locations/" + id)
        .then ((response) => {
            if (response.status === 404) {
                setTitle("Помилка 404. Здається, такої локації не існує");
                throw new Error("404 Location not found: Invalid ID");
            } else {
                return response.json();
            }
        })
        .then((result) => {
            console.log(result);
            setLocation(result);
            setTitle(result.name);
        })
        .catch((err) => {
            console.error(err);
        })
    }, [id]);

    return (
        <div className="container">
            <title>{title}</title>
            <h2>{title}</h2>
        </div>
    );
}

export default LocationInfoPage;