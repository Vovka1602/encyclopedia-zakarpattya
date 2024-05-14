import WelcomeCard from "./Cards/WelcomeCard";

const WelcomeList = ({ data }) => {
    return ( 
        <table>
            <tbody>
                {
                    data.map((location) => (
                        <tr key={location.id}>
                            <td>
                                <div>
                                    <WelcomeCard location={location}/>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}
 
export default WelcomeList;