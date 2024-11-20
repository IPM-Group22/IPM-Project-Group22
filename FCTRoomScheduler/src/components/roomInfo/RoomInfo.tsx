import React, { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import buildingsInfo from '../../storage/buildingsInfo.json';
import translations from '../../storage/translations.json';
import './RoomInfo.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const language = "en";

let valueSelected: String = '';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 767, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    }
};



let functionBook = () => {
    console.log('booked');
    console.log(document.getElementById("timeEnd"));
}

const RoomInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(translations[language].roomInfo.buttonRoomInfo);
    const [selectedOption, setSelectedOption] = useState(translations[language].roomInfo.buttonRoomInfo);
    const { buildingName, roomName } = useParams<{ buildingName: string; roomName: string }>();
    const building = buildingsInfo[buildingName];
    const [roomInfo] = buildingsInfo[buildingName];




    const handleSelect = (index: number) => {
        setCurrentIndex(index);
    };

    const RoomCalendar = () => {
        //let value: Date;
        //let onChange: any;
        const [value, onChange] = useState(new Date());
        valueSelected = value.toISOString().split('T')[0];
        return (
            <Calendar
                onChange={(value) => onChange(value as Date)}
                value={value}
                minDate={new Date('2024-09-01')}
                maxDate={new Date('2024-12-31')}
                onClickDay={(value) => { valueSelected = value.toISOString().split('T')[0]; }}
                onActiveStartDateChange={({ activeStartDate }) => { console.log('month changed', activeStartDate) }}
                showNavigation={true}
                showNeighboringMonth={true}
                showWeekNumbers={false}
            />
        )
    }

    const renderContent = () => {
        switch (selectedOption) {
            case translations[language].roomInfo.buttonRoomInfo:
                return <div className="rooms-list">
                    {building.floors[currentIndex].rooms.map((room, index) => {
                        if (room.name === roomName) {
                            return (
                                <div
                                    key={roomName}
                                    className="room-info-card"
                                >
                                    <div >
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div style={{ flex: 1, alignContent: 'center' }}>
                                                <table style={{ alignContent: 'center' }}>
                                                    <tbody>
                                                        <tr>
                                                            <td>{translations[language].roomInfo.Description}</td>
                                                            <td>{room.description}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>{translations[language].roomInfo.Size}</td>
                                                            <td>{room.size}</td>
                                                        </tr>

                                                        {room.materials.map((material, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>Material - {index + 1}</td>
                                                                    <td>{material.name}</td>
                                                                </tr>
                                                            );
                                                        })}

                                                        {room.qualities.map((qlt, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{translations[language].roomInfo.Quality} - {index + 1}</td>
                                                                    <td>{qlt}</td>
                                                                </tr>
                                                            );
                                                        })}

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <img src={room.photos[1]} alt={room.name} style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>;
            case translations[language].roomInfo.buttonReservations:
                return building.floors[currentIndex].rooms.map((room, index) => {
                    if (room.name === roomName) {
                        return <div key={index}><h1>Reservations{location.pathname}</h1><div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <div style={{ flex: 1, background: 'lightgray', padding: '10px' }}>
                                    <h2>{<RoomCalendar/>}</h2>
                                </div>
                                <div style={{ flex: 1, background: 'white', padding: '10px' }}>
                                    <h2>Reservation Details</h2>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Date</th>
                                                <th>Time Start</th>
                                                <th>Time End</th>
                                            </tr></tbody>
                                        {room.reservations.map((reserve, index) => {
                                            if (reserve.date != valueSelected) {
                                                return null;
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td>{reserve.date}</td>
                                                    <td>{reserve.time_start}</td>
                                                    <td>{reserve.time_end}</td>
                                                </tr>
                                            );
                                        })}
                                    </table>
                                </div>
                            </div>
                        </div></div>;
                    }
                    return null;
                });
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', background: 'steelblue' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1, alignContent: 'center', background: 'skyblue' }}>
                    <button className={'back-button'} onClick={() => navigate(-1)}>{translations[language].roomInfo.buttonBack}</button>
                </div>
                <div style={{ flex: 4, background: 'skyblue' }}>
                    <div className={"centered-container"}><h1>{translations[language].roomInfo.building} {buildingName} {translations[language].roomInfo.room} {roomName}</h1></div>
                </div>
                <div style={{ flex: 1, background: 'skyblue' }}>
                    <div className={"header"}><h1></h1></div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1 }}></div>
                <div style={{ flex: 2 }}>
                    <button className="buttons" onClick={() => setSelectedOption(translations[language].roomInfo.buttonRoomInfo)}>{translations[language].roomInfo.buttonRoomInfo}</button>
                </div>
                <div style={{ flex: 2 }}>
                    <button className="buttons" onClick={() => setSelectedOption(translations[language].roomInfo.buttonReservations)}>{translations[language].roomInfo.buttonReservations}</button>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {renderContent()}
            </div>
            <div>

            </div>
        </div>
    );
};

export default RoomInfo;