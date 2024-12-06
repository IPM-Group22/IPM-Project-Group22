import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from './CustomDropdown';
import filters from '../../storage/filtersInfo.json';
import './Filters.css';
import { getUserLanguage } from "../../session/session.js";
import translations from '../../storage/translations.json';

interface FilterParams {
    roomCapacity: string;
    selectedMaterials: string[];
    selectedFilter4: string[];
    selectedFilter5: string;
}

interface FiltersProps {
    language: string;
}

const Filters: React.FC<FiltersProps> = ({ language }) => {
    const [roomCapacity, setRoomCapacity] = useState('');
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [selectedFilter4, setSelectedFilter4] = useState<string[]>([]);
    const [selectedFilter5, setSelectedFilter5] = useState('');
    const navigate = useNavigate();

    let translation = translations[language]?.filters;

    console.log("Hello " + translation);

    const handleFilter5Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter5(event.target.value);
    };

    const handleSearch = () => {
        const filterParams: FilterParams = {
            roomCapacity,
            selectedMaterials,
            selectedFilter4,
            selectedFilter5,
        };
        console.log(filterParams.roomCapacity, filterParams.selectedMaterials, filterParams.selectedFilter4, filterParams.selectedFilter5);
        navigate('/filters', { state: filterParams });
    };

    return (
        <div className="filters-container">
            <h2>{translation.filters}</h2>

            {/* Room Capacity Input */}
            <label htmlFor="room-capacity">{translation.roomCapacity}:</label>
            <input
                id="room-capacity"
                type="number"
                value={roomCapacity}
                onChange={(e) => setRoomCapacity(e.target.value)}
                placeholder={translation.enterCapacity}
                min="1" // Optional: Minimum value
            />

            {/* Materials Dropdown */}
            <label htmlFor="filter6-select">{translation.materials}:</label>
            <CustomDropdown
                options={filters.materials}
                selectedOptions={selectedMaterials}
                onChange={setSelectedMaterials}
            />

            {/* Room Type Dropdown */}
            <label htmlFor="filter5-select">{translation.roomTypes}:</label>
            <select id="filter5-select" value={selectedFilter5} onChange={handleFilter5Change}>
                <option value="">{translation.selectAnOption}</option>
                {filters.roomType.map((roomType, index) => (
                    <option key={index} value={roomType}>
                        {roomType}
                    </option>
                ))}
            </select>

            {/* Qualities Dropdown */}
            <label htmlFor="filter4-select">{translation.qualities}:</label>
            <CustomDropdown
                options={filters.qualities}
                selectedOptions={selectedFilter4}
                onChange={setSelectedFilter4}
            />

            <button id="searchButton" onClick={handleSearch}>{translation.search}</button>
        </div>
    );
};

export default Filters;