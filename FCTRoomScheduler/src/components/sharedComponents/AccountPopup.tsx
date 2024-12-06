import React from 'react';
import { clearUserSession, isLoggedIn, getUser } from '../../session/session';
import './AccountPopup.css';
import translations from '../../storage/translations.json';

const AccountPopup = ({ onLoginRegister, onLogout, onMyAccount, language }) => {
    let translation = translations[language].floatingButtonAccount;

    return (
        <div className="account-popup">
            {isLoggedIn() ? (
                <>
                    <p>{translation.welcome}, {getUser().username}</p>
                    <div className="button-container">
                        <button onClick={onMyAccount}>{translation.myAccount}</button>
                        <button className="logout-button" onClick={onLogout}>{translation.logout}</button>
                    </div>
                </>
            ) : (
                <div className="button-container">
                    <button onClick={onLoginRegister}>{translation.loginOrRegister}</button>
                </div>
            )}
        </div>
    );
};

export default AccountPopup;