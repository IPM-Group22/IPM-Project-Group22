import React, { useState, useEffect } from 'react';
import buildingsInfo from '../../storage/buildingsInfo.json';
import './FilterResults.css';
import { useLocation, useNavigate } from 'react-router-dom';
import FloatingButton from './FloatingButton';
import LoginRegisterPopup from './LoginRegisterPopup';
import { getUserLanguage, setUserLanguage } from "../../session/session.js";
import translations from '../../storage/translations.json';
import HelpFooter from './helpFooter';

interface FilterResultsProps {
    roomCapacity: string;
    selectedMaterials: string[];
    selectedQualities: string[];
    selectedRoomType: string;
}

const FilterResults: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const filterParams = location.state as FilterResultsProps;
    const { roomCapacity, selectedMaterials, selectedQualities, selectedRoomType } = filterParams;
    const [isAccountOpen, setIsAccountOpen] = useState(false);

    const [language, setLanguage] = useState(getUserLanguage());

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

    let translation = translations[language]?.filterResults;

    const toggleAccount = () => {
        setIsAccountOpen(!isAccountOpen);
    };

    const filterResults = Object.keys(buildingsInfo).reduce((results, buildingKey) => {
        const building = buildingsInfo[buildingKey];

        const floorMatches = building.floors.reduce((floorResults, floor) => {
            const roomMatches = floor.rooms.filter(room => {
                const matchesCapacity = roomCapacity ? room.size >= parseInt(roomCapacity) : true;

                const matchesMaterials = Array.isArray(selectedMaterials) && selectedMaterials.length > 0 ? 
                    selectedMaterials.every(material => room.materials.find(m => m.name == material)) : true;

                const matchesQualities = Array.isArray(selectedQualities) && selectedQualities.length > 0 ? 
                    selectedQualities.every(quality => room.qualities.find(q => q.name == quality)) : true;

                const matchesRoomType = selectedRoomType ? room.roomType === selectedRoomType : true;

                return matchesCapacity && matchesMaterials && matchesQualities && matchesRoomType;
            });

            if (roomMatches.length > 0) {
                floorResults.push({
                    floor: floor.floor,
                    rooms: roomMatches
                });
            }

            return floorResults;
        }, []);

        if (floorMatches.length > 0) {
            results.push({
                buildingName: buildingKey,
                floors: floorMatches
            });
        }

        return results;
    }, []);

    return (
        <>
            <FloatingButton onClick={() => navigate('/')} type="home" />
            <FloatingButton onClick={toggleAccount} type="account" />
            <FloatingButton onClick={handleLanguageChange} type={"language"} />
            {isAccountOpen ? <LoginRegisterPopup onClose={toggleAccount} language={language} /> : <></>}

            <div className={"header"}>
                <h1>{translation.results}</h1>
            </div>

            <div className={"filter-results"}>
                {filterResults.length > 0 ? (
                    filterResults.map((building, index) => (
                        <div key={index} className="building-result">
                            <h2 onClick={() => navigate(`/building/${building.buildingName}`)}>{translation.building} {building.buildingName.toUpperCase()}</h2>
                            {building.floors.map((floor, floorIndex) => (
                                <div key={floorIndex} className="floor-result">
                                    <h3>{translation.floor} {floor.floor}</h3>
                                    {floor.rooms.map((room, roomIndex) => (
                                        <div key={roomIndex} className="room-result">
                                            <p onClick={() => navigate(`/building/${building.buildingName}/room/${room.name}`)}>{translation.room} {room.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="no-results">{translation.noResults}</div>
                )}
            </div>
            <HelpFooter />
        </>
    );
};

export default FilterResults;