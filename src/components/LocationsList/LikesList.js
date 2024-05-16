import LikeCard from "./Cards/LikeCard";

const LikesList = ({ data }) => {
    return ( 
        <table>
            <tbody>
                {
                    data.map((location) => (
                        <tr key={location.id}>
                            <td>
                                <div>
                                    <LikeCard location={location}/>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}
 
export default LikesList;