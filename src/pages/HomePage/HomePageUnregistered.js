import { useEffect } from "react";

const HomePageUnregistered = () => {
    useEffect(() => {
        sessionStorage.clear();
    }, []);

    return ( 
        <div className="container">
            <title>Ласкаво просимо</title>
            <h1>Ласкаво просимо</h1>
            <a href="/login">Увійти</a>
        </div>
    );
}
 
export default HomePageUnregistered;