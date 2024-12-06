import React from 'react';
import { useNavigate } from "react-router-dom";
import translations from '../../storage/translations.json';
import './HelpFooter.css';

interface HelpFooterProps {
    language: string; // Optional prop
    needBackground?: boolean; // Optional prop
}

const HelpFooter: React.FC<HelpFooterProps> = ({ language, needBackground }) => {
    const navigate = useNavigate();

    // Provide a default value if language is not provided
    const translationHelp = translations[language].needHelp;

    return (
        <div 
            className={`help-link ${needBackground ? 'background' : ''}`} 
            onClick={() => navigate('/help')}
        >
            {translationHelp.needHelp}
        </div>
    );
}

export default HelpFooter;