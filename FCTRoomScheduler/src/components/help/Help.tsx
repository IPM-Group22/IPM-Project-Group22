import React, { useState, useEffect } from 'react';
import './help.css';
import FloatingButton from '../sharedComponents/FloatingButton';
import { useNavigate } from 'react-router-dom';
import { getUserLanguage, setUserLanguage } from "../../session/session.js";
import translations from '../../storage/translations.json';
import LoginRegisterPopup from '../sharedComponents/LoginRegisterPopup';

const Help: React.FC = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState(getUserLanguage());
    const [isAccountOpen, setIsAccountOpen] = useState(false);

    useEffect(() => {
        if (!language) {
            setUserLanguage();
            setLanguage(getUserLanguage());
        }
    }, [language]);
    
    const handleLanguageChange = () => {
        setUserLanguage();
        setLanguage(getUserLanguage());
    };

    let translation = translations[language]?.help;

    const toggleAccount = () => {
        setIsAccountOpen(!isAccountOpen);
    };

    return (
        <>
            <div className='titleContainer'>
                <h1>{translation.pageTitle}</h1>
            </div>
            <div className="help-container">
                <div className="floating-buttons">
                    <FloatingButton onClick={toggleAccount} type={"account"} />
                    <FloatingButton onClick={() => navigate(-1)} type={"back"} />
                    <FloatingButton onClick={handleLanguageChange} type={"language"} />
                </div>
                {isAccountOpen ? <LoginRegisterPopup onClose={toggleAccount} language={language} /> : <></>}
                <div className="help-content">
                    <h1 className="help-title">{translation.title}</h1>
                    <div className="faq-section">
                        {translation.faq.map((item, index) => (
                            <div className="faq-item" key={index}>
                                <div className="faq-question">{item.question}</div>
                                <div className="faq-answer">{item.answer}</div>
                            </div>
                        ))}
                    </div>
                    <div className="additional-info">
                        {translation.additionalInfo} <a>{translation.contactEmail}</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Help;