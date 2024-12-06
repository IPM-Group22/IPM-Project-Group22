import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import buildingsInfo from '../../storage/buildingsInfo.json';
import './Building.css';
import FloatingButton from '../sharedComponents/FloatingButton';
import LoginRegisterPopup from '../sharedComponents/LoginRegisterPopup';
import { getUserLanguage, setUserLanguage } from "../../session/session.js";
import translations from '../../storage/translations.json';
import HelpFooter from '../sharedComponents/helpFooter';

const Building = () => {
    const { buildingName } = useParams<{ buildingName: string }>();
    const navigate = useNavigate();
    const building = buildingsInfo[buildingName];
    const [selectedFloor, setSelectedFloor] = useState(0);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [language, setLanguage] = useState(getUserLanguage());

    const toggleAccount = () => {
        setIsAccountOpen(!isAccountOpen);
    };

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

    let translation = translations[language]?.building;

    if (!building) {
        return <div>Building not found</div>;
    }

    return (
        <div className="container">
            <FloatingButton onClick={() => navigate(-1)} type={"back"} />
            <FloatingButton onClick={toggleAccount} type={"account"} />
            <FloatingButton onClick={handleLanguageChange} type={"language"} />
            {isAccountOpen ? <LoginRegisterPopup onClose={toggleAccount} language={language} /> : <></>}
            <div className="building-title"><h1>{translation?.building}: {buildingName.toUpperCase()}</h1></div>
            <img className="building-image" src={building.floors[selectedFloor].floorImage} alt={`${translation?.building} ${buildingName} ${translation?.imageNotFound}`} style = {{ width: '30%' }}/>
            <p className='building-info'>{translation?.numberOfFloors}: {building.numberOfFloors}</p>

            {/* Horizontal List for Floors */}
            <div className="floor-selector">
                {building.floors.map((_, index) => (
                    <button
                        key={index}
                        className={selectedFloor === index ? 'selected' : ''}
                        onClick={() => setSelectedFloor(index)}
                    >
                        {translation?.floor} {index + 1}
                    </button>
                ))}
            </div>

            {/* Display Rooms Based on Selected Floor */}
            <div className="rooms-list">
                {building.floors[selectedFloor].rooms.map((room, index) => (
                    <div
                        key={index}
                        className="room-card"
                        onClick={() => navigate(`/building/${buildingName}/room/${room.name}`)}
                    >
                        <h3>{room.name}</h3>
                        <p>{room.description}</p>
                    </div>
                ))}
            </div>

            <HelpFooter language = {language}/>
        </div>
    );
}

export default Building;