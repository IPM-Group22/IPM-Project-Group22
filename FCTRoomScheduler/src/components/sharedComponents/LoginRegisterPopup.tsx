import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./LoginRegisterPopup.css";
import { login, setUserSession, clearUserSession, userExists } from "../../session/session.js";
import AccountPopup from "./AccountPopup";
import translations from '../../storage/translations.json';
import languageJson from '../../storage/language.json';

let language = languageJson['language'];
let translation = translations[language].loginAndRegister;

const LoginRegisterPopup = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const [usernameRegister, setUsernameRegister] = useState('');
    const [nameRegister, setNameRegister] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [repeatPasswordRegister, setRepeatPasswordRegister] = useState('');

    const [message, setMessage] = useState('');
    const [isAccountPopupVisible, setIsAccountPopupVisible] = useState(true);
    const [showLogin, setShowLogin] = useState(false);

    const [loginPasswordVisible, setPasswordVisible] = useState(false);
    const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
    const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const toggleLogin = () => {
        setIsLogin(!isLogin);
        setMessage(''); // Clear message when toggling between login and register
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const success = login(usernameLogin, passwordLogin);
        if(success){
            setMessage(translation.loginSuccessful);
            onClose();
        } else {
            setMessage(translation.incorrectUsernameOrPassword);
        };
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        // Password must be at least 6 characters long and contain at least one number and one special character
        const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
        return re.test(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (usernameRegister.length < 3) {
            setMessage(translation.usernameTooShort);
            return;
        }
        if (nameRegister.length < 3) {
            setMessage(translation.nameTooShort);
            return;
        }
        if (!validateEmail(emailRegister)) {
            setMessage(translation.invalidEmail);
            return;
        }
        if (!validatePassword(passwordRegister)) {
            setMessage(translation.weakPassword);
            return;
        }
        if (passwordRegister !== repeatPasswordRegister) {
            setMessage(translation.passwordsDoNotMatch);
            return;
        }
        const userAlreadyExists = userExists(usernameRegister, emailRegister);
        if (userAlreadyExists) {
            setMessage(translation.usernameOrEmailAlreadyExists);
        } else {
            const newUser = { 
                username: usernameRegister, 
                name: nameRegister, 
                email: emailRegister, 
                password: passwordRegister 
            };
            setUserSession(newUser);
            setMessage(translation.registrationSuccessful);
            onClose();
        }
    };

    const onLogout = () => {
        clearUserSession();
        onClose();
    };

    const onMyAccount = () => {
        closePopup();
        navigate('/my-account');
    };

    const closePopup = () => {
        setIsAccountPopupVisible(false);
    };

    const showLoginPopUp = () => {
        closePopup();
        setShowLogin(true);
    }

    const toggleLoginPasswordVisibility = () => {
        setPasswordVisible(!loginPasswordVisible);
    };

    const toggleRegisterPasswordVisibility = () => {
        setRegisterPasswordVisible(!registerPasswordVisible);
    };

    const toggleRepeatPasswordVisibility = () => {
        setRepeatPasswordVisible(!repeatPasswordVisible);
    };

    return (
        <>{
            isAccountPopupVisible ? (
                <AccountPopup onLoginRegister={showLoginPopUp} onLogout={onLogout} onMyAccount={onMyAccount}/>
            ) :
            (<>{ setShowLogin ? (
                <div className="popup-overlay">
                {isLogin ? (
                    <div className="content">
                        <button className="close-button" onClick={onClose}>X</button>
                        <div className="text">Login</div>
                        <form onSubmit={handleLogin}>
                            <div className="field">
                                <input placeholder={translation.usernameOrUsername} type="text" className="input" value={usernameLogin} onChange={(e) => setUsernameLogin(e.target.value)} required/>
                                <span className="span">
                                    <svg className="" xmlSpace="preserve" style={{ background: "new 0 0 512 512" }} viewBox="0 0 512 512" y="0" x="0" height="20" width="50" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <g><path className="" data-original="#000000" fill="#595959" d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z"></path></g>
                                    </svg>
                                </span>
                            </div>
                            <div className="field">
                                <input required type={loginPasswordVisible ? "text" : "password"} className="input" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)}/>
                                <span className="span">
                                    <svg className="" xmlSpace="preserve" style={{ background: "new 0 0 512 512" }} viewBox="0 0 512 512" y="0" x="0" height="20" width="50" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <g><path className="" data-original="#000000" fill="#595959" d="M336 192h-16v-64C320 57.406 262.594 0 192 0S64 57.406 64 128v64H48c-26.453 0-48 21.523-48 48v224c0 26.477 21.547 48 48 48h288c26.453 0 48-21.523 48-48V240c0-26.477-21.547-48-48-48zm-229.332-64c0-47.063 38.27-85.332 85.332-85.332s85.332 38.27 85.332 85.332v64H106.668zm0 0"></path></g>
                                    </svg>
                                </span>
                                <button type="button" className="toggle-password" onClick={toggleLoginPasswordVisibility}>
                                    {loginPasswordVisible ? "Hide" : "Show"}
                                </button>
                                <label className="label">Password</label>
                            </div>
                            {message && <div className="message">{message}</div>}
                            <button className="button">Log in</button>
                            <div className="sign-up">
                                {translation.notAMember} 
                                <a onClick={toggleLogin}> {translation.signupNow}</a>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="content">
                        <button className="close-button" onClick={onClose}>X</button>
                        <div className="text">{translation.register}</div>
                        <form onSubmit={handleRegister}>
                        <div className="field">
                            <input placeholder="Username" type="text" className="input" value={usernameRegister} onChange={(e) => setUsernameRegister(e.target.value)} required/>
                            <span className="span">
                                <svg className="" xmlSpace="preserve" style={{ background: "new 0 0 512 512" }} viewBox="0 0 512 512" y="0" x="0" height="20" width="50" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g><path className="" data-original="#000000" fill="#595959" d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z"></path></g>
                                </svg>
                            </span>
                        </div>
                        <div className="field">
                            <input placeholder={translation.name} type="text" className="input" value={nameRegister} onChange={(e) => setNameRegister(e.target.value)} required/>
                            <span className="span">
                                <svg className="" xmlSpace="preserve" style={{ background: "new 0 0 512 512" }} viewBox="0 0 512 512" y="0" x="0" height="20" width="50" xmlnsXlink="http://www.w3.org/2000/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g><path className="" data-original="#000000" fill="#595959" d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z"></path></g>
                                </svg>
                            </span>
                        </div>
                        <div className="field">
                            <input placeholder="Email" type="text" className="input" value={emailRegister} onChange={(e) => setEmailRegister(e.target.value)} required/>
                            <span className="span">
                                <svg viewBox="0 0 8 6" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '19px', height: '15px', marginTop: '19px', marginLeft: '14px' }}>
                                    <path d="m0 0h8v6h-8zm.75 .75v4.5h6.5v-4.5zM0 0l4 3 4-3v1l-4 3-4-3z"/>
                                </svg>
                            </span>
                        </div>
                        <div className="field">
                            <input required type={registerPasswordVisible ? "text" : "password"} className="input" value={passwordRegister} onChange={(e) => setPasswordRegister(e.target.value)}/>
                            <span className="span">
                                <svg className="" xmlSpace="preserve" style={{ background: "new 0 0 512 512" }} viewBox="0 0 512 512" y="0" x="0" height="20" width="50" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g><path className="" data-original="#000000" fill="#595959" d="M336 192h-16v-64C320 57.406 262.594 0 192 0S64 57.406 64 128v64H48c-26.453 0-48 21.523-48 48v224c0 26.477 21.547 48 48 48h288c26.453 0 48-21.523 48-48V240c0-26.477-21.547-48-48-48zm-229.332-64c0-47.063 38.27-85.332 85.332-85.332s85.332 38.27 85.332 85.332v64H106.668zm0 0"></path></g>
                                </svg>
                            </span>
                            <label className="label">Password</label>
                            <button type="button" className="toggle-password" onClick={toggleRegisterPasswordVisibility}>
                                {registerPasswordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                        <div className="field">
                            <input required type={repeatPasswordVisible ? "text" : "password"} className="input" value={repeatPasswordRegister} onChange={(e) => setRepeatPasswordRegister(e.target.value)}/>
                            <span className="span">
                                <svg className="" xmlSpace="preserve" style={{ background: "new 0 0 512 512" }} viewBox="0 0 512 512" y="0" x="0" height="20" width="50" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g><path className="" data-original="#000000" fill="#595959" d="M336 192h-16v-64C320 57.406 262.594 0 192 0S64 57.406 64 128v64H48c-26.453 0-48 21.523-48 48v224c0 26.477 21.547 48 48 48h288c26.453 0 48-21.523 48-48V240c0-26.477-21.547-48-48-48zm-229.332-64c0-47.063 38.27-85.332 85.332-85.332s85.332 38.27 85.332 85.332v64H106.668zm0 0"></path></g>
                                </svg>
                            </span>
                            <label className="label">{translation.repeatPassword}</label>
                            <button type="button" className="toggle-password" onClick={toggleRepeatPasswordVisibility}>
                                {repeatPasswordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                        {message && <div className="message">{message}</div>}
                        <button className="button">Sign up</button>
                        <div className="sign-up">
                            {translation.alreadyAMember} 
                            <a onClick={toggleLogin}> {translation.loginNow} </a>
                        </div>
                        </form>
                    </div>
                )}
            </div>) : (<></>)}</>)
        }</>
    );
}

export default LoginRegisterPopup;