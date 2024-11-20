import React, { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import buildingsInfo from '../../storage/buildingsInfo.json';
import './RoomInfo.css';
import { Calendar } from 'react-calendar';


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

let valueSelected: String = '';

let functionBook = () => {
    console.log('booked');
    console.log(document.getElementById("timeEnd"));
}

const RoomInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('Room Info');
    const { buildingName, roomName } = useParams<{ buildingName: string; roomName: string }>();
    const building = buildingsInfo[buildingName];
    const [roomInfo] = buildingsInfo[buildingName];

    const handleSelect = (index: number) => {
        setCurrentIndex(index);
    };

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState(null), []);


    const RoomCalendar = () => {
        let value: Date;
        let onChange: any;
        [value, onChange] = useState(new Date());
        valueSelected = value.toISOString().split('T')[0];
        return (
            <Calendar
                onChange={onChange}
                value={value}
                minDate={new Date('2024-11-01')}
                maxDate={new Date('2024-11-30')}
                onClickDay={(value) => { valueSelected = value.toISOString().split('T')[0]; forceUpdate(); }}
                onActiveStartDateChange={({ activeStartDate }) => { console.log('month changed', activeStartDate) }}
                showNavigation={true}
                tileDisabled={({ date }) => date < new Date('2024-11-01') || date > new Date('2024-11-30')}
                showNeighboringMonth={true}
                showWeekNumbers={false}
            />
        )
    }

    const renderContent = () => {
        switch (selectedOption) {
            case 'Room Info':
                return <div className="rooms-list">
                    {building.floors[currentIndex].rooms.map((room, index) => {
                        if (room.name === roomName) {
                            console.log('room', room);
                            console.log('materials', room.materials);
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
                                                            <td>Description</td>
                                                            <td>{room.description}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Size</td>
                                                            <td>{room.size}</td>
                                                        </tr>
                                                        <tr>
                                                            {room.materials.map((material, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>Material - {index + 1}</td>
                                                                        <td>{material.name}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tr>
                                                        <tr>
                                                            {room.qualities.map((qlt, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>Quality - {index + 1}</td>
                                                                        <td>{qlt}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tr>
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
            case 'Reservations':
                return building.floors[currentIndex].rooms.map((room, index) => {
                    if (room.name === roomName) {
                        return <div><h1>Reservations{location.pathname}</h1><div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <div style={{ flex: 1, background: 'lightgray', padding: '10px' }}>
                                    <h2>{<RoomCalendar />}</h2>
                                </div>
                                <div style={{ flex: 1, background: 'white', padding: '10px' }}>
                                    <h2>Reservation Details</h2>
                                    <table>
                                        <tr>
                                            <th>Date</th>
                                            <th>Time Start</th>
                                            <th>Time End</th>
                                        </tr>
                                        {room.reservations.map((reserve, index) => {
                                            if (reserve.date != valueSelected) {
                                                return null;
                                            }
                                            return (
                                                <tr>
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

            case 'Make Reserve':
                return building.floors[currentIndex].rooms.map((room, index) => {
                    if (room.name === roomName) {
                        return <div><h1>Make Reserve</h1><div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <div style={{ flex: 1, background: 'lightgray', padding: '10px' }}>
                                    <h2>{<RoomCalendar />}</h2>
                                </div>
                                <div style={{ flex: 1, background: 'white', padding: '10px' }}>
                                    <h2>Reservation Time</h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                                        <label>Time Start<input name="time-start" id="timeStart" type="time"/></label>
                                        <label>Time End <input name="time-end" id="timeEnd" type="time"/></label>
                                        <button className={'reserve-button'} onClick={() => functionBook()}>Book</button>
                                    </div>
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
                    <button className={'back-button'} onClick={() => navigate(-1)}>Back</button>
                </div>
                <div style={{ flex: 4, background: 'skyblue' }}>
                    <div className={"centered-container"}><h1>Building {buildingName} Room {roomName}</h1></div>
                </div>
                <div style={{ flex: 1, background: 'skyblue' }}>
                    <div className={"header"}><h1></h1></div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1 }}></div>
                <div style={{ flex: 2 }}>
                    <button className="buttons" onClick={() => setSelectedOption('Room Info')}>Room Info</button>
                </div>
                <div style={{ flex: 2 }}>
                    <button className="buttons" onClick={() => setSelectedOption('Reservations')}>Reservations</button>
                </div>
                <div style={{ flex: 2 }}>
                    <button className="buttons" onClick={() => setSelectedOption('Make Reserve')}>Make Reserve</button>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default RoomInfo;