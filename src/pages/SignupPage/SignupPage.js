import { useState } from "react";
import "./SignupPage.css"
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [id, changeId] = useState("");
    const [password, changePassword] = useState("");
    const admin_access = false;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let signup_user = { id, password, admin_access };
        console.log(signup_user);
        fetch("http://localhost:8000/users")
            .then((res) => res.json())
            .then((response) => {
                if(response.findIndex(item => signup_user.id === item.id) === -1) {
                    fetch("http://localhost:8000/users", {
                        method: "POST",
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(signup_user)
                    })
                        .then((res) => {
                            navigate('/login');
                        })
                        .catch((err) => {
                            console.error(err.message);
                        });
                } else {
                    alert(`Логін '${signup_user.id}' уже існує.\nУвійдіть або придумайте інший логін.`)
                }
            });
    }

    return (
        <div className="container">
            <form className="container" onSubmit={handleSubmit}>
                <h1>Створити обліковий запис</h1>
                <input required placeholder="Логін" value={id} onChange={e => changeId(e.target.value)}></input>
                <input required placeholder="Пароль" value={password} onChange={e => changePassword(e.target.value)} type="password"></input>
                <button type="submit">Зареєструватися</button>
            </form>
        </div>
    );
}

export default SignupPage;