import React from 'react'
import languageJson from '../../storage/language.json';
import translations from '../../storage/translations.json';
import { useNavigate } from "react-router-dom";

let language = languageJson['language'];
let translationHelp = translations[language].needHelp;

const HelpFooter = () => {
    const navigate = useNavigate();

    return (
        <div className="help-link" 
            style={
                {position: 'absolute',bottom: '25px',right: '10px',cursor: 'pointer',color: 'white',textDecoration: 'underline',zIndex: 1000,}
            } 
            onClick={() => navigate('/help')}
        >
            {translationHelp.needHelp}
          </div>
    )
}

export default HelpFooter