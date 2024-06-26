import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import '../SignupPage/SignupPage.css';

const EditProfilePage = () => {
    const [userdata, setUserData] = useState(null);
    const [password, change_password] = useState("");
    const [email, change_email] = useState("");
    const [fullname, change_fullname] = useState("");
    const [editedPassword, change_editedPassword] = useState("");
    const [editedEmail, change_editedEmail] = useState("");
    const [editedFullname, change_editedFullname] = useState("");
    const [defaultAvatar, setDefaultAvatar] = useState('./Images/Avatars/1.png');
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [avatar, setAvatar] = useState('./Images/Avatars/1.png');
    const [defaultFullname, setDefaultFullname] = useState("");
    const [defaultPassword, setDefaultPassword] = useState("");
    const [defaultEmail, setDefaultEmail] = useState("");
    const [avatarOptions] = useState([
        "./Images/Avatars/1.png",
        "./Images/Avatars/2.png",
        "./Images/Avatars/3.png",
        "./Images/Avatars/4.png",
        "./Images/Avatars/5.png",
        "./Images/Avatars/6.png",
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem("username");
        if (username === "" || username === null) {
            navigate("/welcome");
        }
    }, [navigate]);

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

    useEffect(() => {
        fetch('http://localhost:8000/users/' + sessionStorage.getItem("username"))
            .then(res => res.json())
            .then(userdata => {
                setUserData(userdata);
                setDefaultAvatar(userdata.avatar);
                setDefaultFullname(userdata.fullname);
                setDefaultPassword(userdata.password);
                setDefaultEmail(userdata.email);
            });
    });

    useEffect(() => {
        if (selectedAvatar === '' || selectedAvatar === null) {
            setAvatar(defaultAvatar);
        }
        else {
            setAvatar(selectedAvatar);
        }
        if (editedFullname === '' || editedFullname === null) {
            change_fullname(defaultFullname);
        }
        else {
            change_fullname(editedFullname);
        }
        if (editedEmail === '' || editedEmail === null) {
            change_email(defaultEmail);
        }
        else {
            change_email(editedEmail);
        }
        if (editedPassword === '' || editedPassword === null) {
            change_password(defaultPassword);
        }
        else {
            change_password(editedPassword);
        }
    }, [defaultFullname, defaultEmail, defaultPassword, defaultAvatar, editedEmail, editedFullname, editedPassword, selectedAvatar]);

    const handle_submit = (e) => {
        e.preventDefault();
        let signup_user = {
            ...userdata,
            avatar: avatar,
            fullname: fullname,
            email: email,
            password: password
        };
        fetch("http://localhost:8000/users/" + userdata.id, {
            method: "PUT",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(signup_user)
        })
            .then((res) => {
                navigate('/myprofile');
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    return (
        <div className='container'>
            <title>Редагування профілю</title>
            <form onSubmit={handle_submit}>
                <div className='card' data-bs-theme='dark'>
                    <div className='card-header'>
                        <h2>Редагування облікового запису</h2>
                    </div>
                    <div className='card-body'>
                        <div className='avatar-settings'>
                            <div>
                                <h3>Аватар</h3>
                                {avatar && <img className='rounded-circle' src={avatar} alt='selected avatar' />}
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
                        <input
                            className='form-control mt-3'
                            value={editedFullname}
                            onChange={e => change_editedFullname(e.target.value)}
                            placeholder="Змінити ім'я"
                        />
                        <input
                            className='form-control mt-3'
                            value={editedPassword}
                            onChange={e => change_editedPassword(e.target.value)}
                            type='password'
                            placeholder='Змінити пароль'
                        />
                        <input
                            className='form-control mt-3 mb-3'
                            value={editedEmail}
                            onChange={e => change_editedEmail(e.target.value)}
                            placeholder='Змінити E-Mail'
                        />
                    </div>
                    <div className='card-footer'>
                        <button className='btn btn-primary btn-lg px-5' type='submit'>Застосувати зміни</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProfilePage;
