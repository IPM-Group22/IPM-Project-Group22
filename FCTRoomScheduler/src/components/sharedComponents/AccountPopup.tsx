import React from 'react';
import { clearUserSession, isLoggedIn, getUser } from '../../session/session';
import './AccountPopup.css';
import translations from '../../storage/translations.json';
import { getUserLanguage } from "../../session/session.js";

const language = getUserLanguage();
let translation = translations[language].floatingButtonAccount;

const AccountPopup = ({ onLoginRegister, onLogout, onMyAccount }) => {
    return (
        <div className="account-popup">
            {isLoggedIn() ? (
                <>
                    <p>{translation.welcome}, {getUser().username}</p>
                    <div className="button-container">
                        <button onClick={onMyAccount}>{translation.myAccount}</button>
                        <button className="logout-button" onClick={onLogout}>Logout</button>
                    </div>
                </>
            ) : (
                <div className="button-container">
                    <button onClick={onLoginRegister}>Login or Register</button>
                </div>
            )}
        </div>
    );
};

export default AccountPopup;