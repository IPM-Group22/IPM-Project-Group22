import React, { useState, useEffect } from "react";
import './Account.css';
import { getUserToken, getUser, isLoggedIn, clearUserSession } from "../../session/session.js";
import { useNavigate } from "react-router-dom";
import buildingsInfo from '../../storage/buildingsInfo.json';
import HelpFooter from '../sharedComponents/helpFooter';
import { getUserLanguage, setUserLanguage } from "../../session/session.js";
import translations from '../../storage/translations.json';
import FloatingButton from "../sharedComponents/FloatingButton";


const Account = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [language, setLanguage] = useState(getUserLanguage());
  const navigate = useNavigate();
  const userLoggedIn = isLoggedIn();
  
  useEffect(() => {
    if (!language) {
      setUserLanguage();
      setLanguage(getUserLanguage());
    }
  }, [language]);

  let translation = translations[language]?.account;

  const getUserReservations = (buildingsData, username) => { //Get all the reservations for a specific user
    const userReservations = [];
    const allUserReservations = [];
    // Iterate through each building
    Object.entries(buildingsData).forEach(([buildingId, building]) => {
      // Iterate through each floor
      building['floors'].forEach(floor => {
        // Iterate through each room
        floor.rooms.forEach(room => {
          // If the room has reservations
          if (room.reservations && Array.isArray(room.reservations)) {
            // Filter reservations for the specified user
            const roomReservations = room.reservations.filter(
              reservation => reservation.user === username
            );

            // Add building and room context to each reservation
            roomReservations.forEach(reservation => {
              userReservations.push({
                ...reservation,
                buildingId,
                floorNumber: floor.floor,
                roomName: room.name,
                roomType: room.type,
              });
            });
          }
        });
      });
    });

    
    // Sort reservations by date and time
    return userReservations.sort((a, b) => {
      const dateComparison = a.date.localeCompare(b.date);
      if (dateComparison !== 0) return dateComparison;
      return a.time_start.localeCompare(b.time_start);
    });
  };

  const cancelReservation = (reservationId) => {
    Object.entries(buildingsInfo).forEach(([buildingId, building]) => {
      building.floors.forEach(floor => {
        floor.rooms.forEach(room => {
          if (room.reservations && Array.isArray(room.reservations)) {
      const reservationIndex = room.reservations.findIndex(
        reservation => reservation.id === reservationId
      );
      if (reservationIndex !== -1) {
        room.reservations.splice(reservationIndex, 1);
      }
          }
        });
      });
    });
  };

  const confirmCancelReservation = (reservationId) => {
    if (window.confirm(translation.confirmReservationCancel)) {
      cancelReservation(reservationId);
    }
  };

  const ReservationsList = ({ buildingsData }) => {
    const userReservations = getUserReservations(buildingsData, getUser().username);

    const isPastReservation = (date) => {
      const today = new Date().toISOString().split('T')[0];
      return date < today;
    };

    return (
      <div className = "reservationsContent">
        <h2>{getUser().username}{translation.userReservations}</h2>
        {userReservations.length === 0 ? (
          <p>{translation.messageNoReservations}</p>
        ) : (
          <ul>
            {userReservations.map((item, index) => (
          <li key={`${item.date}-${item.time_start}-${index}`}>
            <p>
              {translation.building} {item.buildingId.toUpperCase()} - {translation.room} {item.roomName}
            </p>
            <p>
              {translation.date}: {item.date}
            </p>
            <p>
              {translation.time}: {item.time_start} - {item.time_end}
            </p>
            {!isPastReservation(item.date) && (
              <button onClick={() => confirmCancelReservation(item.id)}>{translation.cancelReservation}</button>
            )}
          </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
      

  const renderContent = () => {
    switch (selectedOption) {
      case translation.aboutUser:
        const user = getUser();
        return (
            <div className="user-details-container">
              <div className="user-details-card">
                <h2 className="user-details-title">{translation.userProfile}</h2>
                
                <div className="user-details-grid">
                  <div className="user-detail-item">
                    <div className="detail-label">Username</div>
                    <div className="detail-value">{user.username}</div>
                  </div>
                  
                  <div className="user-detail-item">
                    <div className="detail-label">{translation.name}</div>
                    <div className="detail-value">{user.name}</div>
                  </div>
                  
                  <div className="user-detail-item">
                    <div className="detail-label">Email</div>
                    <div className="detail-value">{user.email}</div>
                  </div>
                </div>
              </div>
            </div>
          );
      case translation.reservations:
        return <ReservationsList buildingsData={buildingsInfo} />;
      default:
        return <div className="selectOption">{translation.selectOptionFromTheSidebar}</div>;
    }
  }

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const logoutHandler = () => {
    setShowLogoutConfirm(!showLogoutConfirm);
  };

  const confirmLogout = () => {
    clearUserSession();
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const LogoutConfirmationBox = () => (
    <div className="logout-confirmation-overlay">
      <div className="logout-confirmation-box">
        <p>{translation.logoutMessage}</p>
        <div className="logout-buttons">
          <button onClick={confirmLogout}>{translation.confirmLogout}</button>
          <button onClick={cancelLogout}>{translation.cancelLogout}</button>
        </div>
      </div>
    </div>
  );

  const handleLanguageChange = () => {
    setUserLanguage();
    setLanguage(getUserLanguage());
  };

  return (
    userLoggedIn ? 
      <div className="account-container">
        <FloatingButton onClick={() => navigate(-1)} type="back" />
        <FloatingButton onClick={handleLanguageChange} type={"language"} />
        <div className="account-sidebar">
            <h1>{translation.accountPage}</h1>
            <ul>
              <li><button onClick={() => setSelectedOption(translation.aboutUser)}>{translation.aboutUser}</button></li>
              <li><button onClick={() => setSelectedOption(translation.reservations)}>{translation.reservations}</button></li>
              <li><button className = "logout-button" onClick={logoutHandler}>{translation.logout}</button></li>
            </ul>
            {showLogoutConfirm && <LogoutConfirmationBox />}
        </div>
        <div className="account-content">
          {!showLogoutConfirm && renderContent()}
        </div>
        <HelpFooter />
      </div>
      : 
      <div>
          <div className="notLogged">{translation.notLoggedIn}</div>
          <FloatingButton onClick={() => navigate('/')} type="back" />
      </div>
  );
}


export default Account;