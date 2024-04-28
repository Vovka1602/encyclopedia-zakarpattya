import { useEffect, useState } from "react";
import "./LoginPage.css"
import { useNavigate } from "react-router-dom";

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
            if(response.findIndex(item => id === item.id) === -1) {
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
            <form className="container" onSubmit={loginProceed}>
                <h1>Увійти</h1>
                <input required placeholder="Логін" value={id} onChange={e => changeId(e.target.value)}></input>
                <input required placeholder="Пароль" type="password" value={password} onChange={e => changePassword(e.target.value)}></input>
                <button type="submit">Вхід</button>
            </form>
        </div>
    );
}

export default LoginPage;