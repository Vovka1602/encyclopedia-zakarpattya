import "./SignupPage.css"

const SignupPage = () => {
    return ( 
        <div className="container">
            <form className="container">
                <h1>Створити обліковий запис</h1>
                <input placeholder="Логін"></input>
                <input placeholder="Пароль" type="password"></input>
                <button type="submit">Зареєструватися</button>
            </form>
        </div>
    );
}
 
export default SignupPage;