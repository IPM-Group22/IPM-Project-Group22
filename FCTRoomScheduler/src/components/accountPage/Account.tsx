import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import buildingsInfo from '../../storage/buildingsInfo.json';

const Account = () => {

    return (


        <div style={{ display: 'flex' }}>
            <div style={{ height: '20%', borderRight: '1px solid black', padding: '10px' }}>
                <h1>Account Page</h1>
            </div>
            <div style={{ width: '30%', borderRight: '1px solid black', padding: '10px' }}>
                <ul>
                    <li><button className={'back-button'} onClick={() => console.log('See reservations')}>Change Password</button></li>
                    <li><button className={'back-button'} onClick={() => console.log('See reservations')}>See Reservations</button></li>
                    <li><button className={'back-button'} onClick={() => console.log('See reservations')}>Definitions</button></li>
                    <li><button className={'back-button'} onClick={() => console.log('See reservations')}>Logout</button></li>
                </ul>
            </div>
            <div style={{ flex: 1, padding: '10px' }}>
                {/* Right side content will go here */}
            </div>
        </div>
    );
}

export default Account;