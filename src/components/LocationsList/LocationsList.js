import LocationCard from "./LocationCard";

const LocationsList = ({ data }) => {
    return ( 
        <table>
            <tbody>
                {
                    data.map((location) => (
                        <tr key={location.id}>
                            <td>
                                <div>
                                    <LocationCard location={location}></LocationCard>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}
 
export default LocationsList;