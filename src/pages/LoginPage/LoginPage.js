import { useEffect, useState } from "react";
import "./LoginPage.css"
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
    const [id, changeId] = useState("");
    const [password, changePassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const loginProceed = (e) => {
        e.preventDefault();
        console.log("proceeding...");
        fetch("http://localhost:8000/users")
            .then((res) => {
                return res.json();
            }).then((response) => {
                if (response.findIndex(item => id === item.id) === -1) {
                    console.log("Login error: invalid credentials")
                    alert("Хибний логін або пароль");
                }
                else {
                    fetch("http://localhost:8000/users/" + id)
                        .then((res) => res.json())
                        .then((response) => {
                            if (response.password === password) {
                                console.log("Login success. Welcome, " + id);
                                sessionStorage.setItem("username", id);
                                navigate("/");
                            }
                            else {
                                console.log("Login error: invalid password");
                                alert(`Хибний пароль для ${response.id}.`);
                            }
                        });
                }
            }).catch((err) => {
                console.log("Login error:" + err.message);
            });
    }

    return (
        <div className="container">
            <form className="login-form" onSubmit={loginProceed}>
                <div className="card">
                    <div className="card-header">
                        <h2>Увійти</h2>
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
                            type="password" value={password}
                            onChange={e => changePassword(e.target.value)}>
                        </input>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary btn-lg px-5" type="submit">Вхід</button>
                    </div>
                </div>
            </form>
            <div className="mt-2">
                <span className="me-2">Не маєте акаунту?</span>
                <span>
                    <a href="/signup">
                        <button className="btn btn-outline-primary rounded-pill px-4 mb-1">Зареєструватися</button>
                    </a>
                </span>
            </div>
        </div>
    );
}

export default LoginPage;