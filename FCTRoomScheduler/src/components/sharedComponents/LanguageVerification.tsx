import React from 'react';
import { getUserLanguage, setUserLanguage } from '../../session/session';

const LanguageVerification = () => {
    if(getUserLanguage() === null) {
        setUserLanguage();
    }
    return;
}

export default LanguageVerification;