import React from "react";
import {useNavigate} from "react-router-dom";

const RoomInfo = () => {

    const navigate = useNavigate();
    
    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>Room Info</h1>
        </div>
    );
}

export default RoomInfo;