import { useEffect, useState } from "react";
import "./SignupPage.css"
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SignupPage = () => {
    const [id, changeId] = useState("");
    const [password, changePassword] = useState("");
    const admin_access = false;

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let signup_user = { id, password, admin_access };
        console.log(signup_user);
        fetch("http://localhost:8000/users")
            .then((res) => res.json())
            .then((response) => {
                if (response.findIndex(item => signup_user.id === item.id) === -1) {
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
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="card" data-bs-theme="dark">
                    <div className="card-header">
                        <h2>Створити обліковий запис</h2>
                    </div>
                    <div className="card-body py-4 px-4">
                        <input
                            required
                            className="form-control"
                            placeholder="Логін"
                            value={id}
                            onChange={e => changeId(e.target.value)}>
                        </input>
                        <input
                            required
                            className="form-control mt-3"
                            placeholder="Пароль"
                            value={password}
                            onChange={e => changePassword(e.target.value)}
                            type="password">
                        </input>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary btn-lg px-5" type="submit">Реєстрація</button>
                    </div>
                </div>
            </form>
            <div className="mt-2">
                <span className="me-2">Уже маєте акаунт?</span>
                <span>
                    <a href="/login">
                        <button className="btn btn-outline-primary rounded-pill px-4 mb-1">Увійти</button>
                    </a>
                </span>
            </div>
        </div>
    );
}

export default SignupPage;