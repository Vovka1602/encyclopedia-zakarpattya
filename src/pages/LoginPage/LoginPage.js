import "./LoginPage.css"

const LoginPage = () => {
    return ( 
        <div className="container">
            <form className="container">
                <h1>Увійти</h1>
                <input placeholder="Логін"></input>
                <input placeholder="Пароль" type="password"></input>
                <button type="submit">Зареєструватися</button>
            </form>
        </div>
    );
}
 
export default LoginPage;