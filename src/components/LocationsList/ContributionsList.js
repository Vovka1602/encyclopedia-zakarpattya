import ContributionCard from "./Cards/ContributionCard";

const ContributionsList = ({ data }) => {
    return ( 
        <table>
            <tbody>
                {
                    data.map((location) => (
                        <tr key={location.id}>
                            <td>
                                <div>
                                    <ContributionCard location={location}/>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}
 
export default ContributionsList;