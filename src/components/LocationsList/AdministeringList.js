import AdministeringCard from "./Cards/AdministeringCard";

const AdministeringList = ({ data }) => {
    return ( 
        <table>
            <tbody>
                {
                    data.map((location) => (
                        <tr key={location.id}>
                            <td>
                                <div>
                                    <AdministeringCard location={location}/>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}
 
export default AdministeringList;