import { useEffect, useState } from "react";
import "./SignupPage.css"
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SignupPage = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState("./Images/Avatars/1.png");

    const admin_access = false;
    const avatarOptions = [
        "./Images/Avatars/1.png",
        "./Images/Avatars/2.png",
        "./Images/Avatars/3.png",
        "./Images/Avatars/4.png",
        "./Images/Avatars/5.png",
        "./Images/Avatars/6.png",
    ];

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let signup_user = { id, password, admin_access, email, fullname, avatar: selectedAvatar };
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

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedAvatar(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarOptionClick = (avatar) => {
        setSelectedAvatar(avatar);
    };

    return (
        <div className='container'>
            <title>Реєстрація - Енциклопедія Закарпаття</title>
            <form onSubmit={handleSubmit}>
                <div className='card' data-bs-theme='dark'>
                    <div className='card-header'>
                        <h2>Створити обліковий запис</h2>
                    </div>
                    <div className='card-body'>
                        <div className='avatar-settings'>
                            <div>
                                <h3>Аватар</h3>
                                {selectedAvatar && <img className='rounded-circle' src={selectedAvatar} alt='selected avatar' />}
                            </div>
                            <div className='avatar-options'>
                                <h4 className='fs-5'>Виберіть зі списку:</h4>
                                {avatarOptions.map((avatar, index) => (
                                    <img
                                        key={index}
                                        className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                                        src={avatar}
                                        alt={`avatar ${index + 1}`}
                                        onClick={() => handleAvatarOptionClick(avatar)}
                                    />
                                ))}
                                <h4 className='fs-5'>Або</h4>
                                <input
                                    type='file'
                                    accept='image/*'
                                    className='form-control mt-1 mb-2'
                                    onChange={handleAvatarChange}
                                />
                            </div>
                        </div>
                        <h4 className='mb-3'>Особисті дані</h4>
                        <input
                            required
                            className='form-control'
                            value={id}
                            onChange={e => setId(e.target.value)}
                            placeholder='Логін'
                        />
                        <input
                            required
                            className='form-control mt-3'
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                            placeholder="Повне ім'я"
                        />
                        <input
                            required
                            className='form-control mt-3'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type='password'
                            placeholder='Пароль'
                        />
                        <input
                            required
                            className='form-control mt-3 mb-2'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='E-Mail'
                        />
                    </div>
                    <div className='card-footer'>
                        <button className='btn btn-primary btn-lg px-5' type='submit'>
                        <div className="btn-text">Зареєструватися</div>
                        </button>
                    </div>
                </div>
            </form>
            <div className='mt-2'>
                <span className='me-2'>Вже маєте акаунт? </span>
                <span>
                    <a href='/login'>
                        <button className='btn btn-outline-primary mb-1 px-4'>Увійти</button>
                    </a>
                </span>
            </div>
        </div>
    );
}

export default SignupPage;