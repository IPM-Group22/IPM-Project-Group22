import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import buildingsInfo from '../../storage/buildingsInfo.json';


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
                                    className="room-card"
                                //onClick={() => console.log(building.floors[currentIndex].rooms[index])}
                                //onClick={() => console.log(room)}
                                >
                                    <div className="row">
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div style={{ flex: 2, alignContent: 'center', background: 'green' }}>
                                                <table>
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
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div style={{ flex: 1, background: 'red' }}>
                                                <img src={room.photo} alt={room.name} style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>;
            //return <div><h1>{roomInfo}------{roomName}+++{location.pathname}</h1></div>;
            //return <div><h1>{useState('Room Info')}Room Info-----{location.pathname}---------------{RoomInfo}</h1></div>;
            case 'Reservations':
                console.log('[selectedOption, setSelectedOption]', [selectedOption, setSelectedOption]);
                console.log('location', location);
                console.log('building', building);
                console.log('roomName', roomName);
                console.log('currentIndex', currentIndex);
                console.log('building.floors[currentIndex]', building.floors[currentIndex]);
                console.log('roomInfo', roomInfo);
                return <div><h1>Reservations{location.pathname}</h1></div>;
            case 'Make Reserve':
                return <div><h1>Make Reserve{location.pathname}</h1></div>;
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 2, alignContent: 'center', background: 'green' }}>
                    <button className={'.back-button'} onClick={() => navigate(-1)}>Back</button>
                </div>
                <div style={{ flex: 1, background: 'red' }}>
                    <div className={"room-name"}><h1>Building {buildingName} Room {roomName}</h1></div>
                </div>
                <div style={{ flex: 1, background: 'blue' }}>
                    <div className={"room-name"}><h1></h1></div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignSelf: "space-around" }}>
                <div className={"rooms-list"}>
                    <button className="buttons" onClick={() => setSelectedOption('Room Info')}>Room Info</button>
                    <button onClick={() => setSelectedOption('Reservations')}>Reservations</button>
                    <button onClick={() => setSelectedOption('Make Reserve')}>Make Reserve</button>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

export default RoomInfo;