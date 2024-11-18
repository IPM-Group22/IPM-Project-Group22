import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip } from 'react-leaflet';
import { LatLngExpression } from 'leaflet'; // Correct import for LatLngExpression
import 'leaflet/dist/leaflet.css';
import './Home.css';
import FloatingButton from '../sharedComponents/FloatingButton';
import Drawer from '../sharedComponents/Drawer';
import LoginRegisterPopup from '../sharedComponents/LoginRegisterPopup';

const center: [number, number] = [38.660917187755416, -9.206071341318228];

export default function Home() {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [polygonClicked, setPolygonClicked] = useState(false);

  // Random coordinates for a polygon (using LatLngExpression for Leaflet)
  const randomCoordinates: LatLngExpression[] = [
    [38.66157758450609, -9.203431336955777],
    [38.661196793559306, -9.204095040091264],
    [38.66071305625246, -9.203507067232309],
    [38.66112577733982, -9.202874554978754],
  ];


  // Handle click event on the polygon
  const handlePolygonClick = () => {
    setPolygonClicked(!polygonClicked);
    alert('Polygon clicked!');
  };

  // Toggle Drawer (Filters/Settings)
  const toggleTab = () => {
    setIsTabOpen(!isTabOpen);
  };

  // Toggle Account (Login/Register Popup)
  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={17}
        style={{ width: '100vw', height: '100vh' }}
        dragging={false} // Disable dragging
        scrollWheelZoom={false} // Disable zooming with the mouse wheel
        zoomControl={false} // Disable zoom control buttons
      >
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=04pdRTC6gIF3rA4KHB79"
          attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>'
        />

        {/* Random Clickable Polygon with transparent gray color */}
        <Polygon
          positions={randomCoordinates}
          eventHandlers={{
            click: handlePolygonClick,
          }}
          pathOptions={{
            color: 'gray', // Border color
            fillColor: 'gray', // Fill color
            fillOpacity: 0.3, // Transparency level (0 = fully transparent, 1 = fully opaque)
            weight: 2, // Border thickness
          }}
        >
          <Tooltip permanent>Building II</Tooltip>
        </Polygon>
      </MapContainer>

      {/* Left Button to open the Drawer */}
      <button className="clickable-button left" onClick={toggleTab}>
        Filters
      </button>

      {/* Right Button to open Login/Register Popup */}
      <button className="clickable-button right" onClick={toggleAccount}>
        Account
      </button>

      {/* Drawer for Filters/Settings */}
      <Drawer isOpen={isTabOpen} onClose={toggleTab}>
        <div style={{ padding: '20px' }}>
          <h2>Filters</h2>
          <p>Put any content you want here, like filters, settings, notifications, etc.</p>
        </div>
      </Drawer>

      {/* Login/Register Popup */}
      <LoginRegisterPopup isOpen={isAccountOpen} onClose={toggleAccount} />

      {/* Optionally, show a message when the polygon is clicked */}
      {polygonClicked && <p>The polygon was clicked!</p>}
    </div>
  );
}
