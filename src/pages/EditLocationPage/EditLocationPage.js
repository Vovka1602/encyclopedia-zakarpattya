import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditLocationPage = () => {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [defaultName, setDefaultName] = useState("");
    const [defaultLocationData, setDefaultLocationData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/locations/" + id)
            .then((response) => {
                if (response.status === 404) {
                    setTitle("Помилка 404. Здається, такої локації не існує");
                    throw new Error("404 Location not found: Invalid ID");
                } else {
                    return response.json();
                }
            })
            .then((location) => {
                setTitle("Редагування локації '" + location.name + "'");
                setDefaultName(location.name);
                setDefaultLocationData(location);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [id]);

    return ( 
        <h2>{title}</h2>
    );
}
 
export default EditLocationPage;