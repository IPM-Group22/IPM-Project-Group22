import {
    createBrowserRouter, Outlet, RouterProvider,
} from 'react-router-dom'
import React, { useEffect } from 'react'
import Home from "./components/home/Home";
import Building from "./components/buildingPage/Building";
import RoomInfo from "./components/roomInfo/RoomInfo";
import Error from "./components/error/Error";
import SearchResults from "./components/searchResults/SearchResults";
import Account from "./components/accountPage/Account";
import FilterResults from "./components/sharedComponents/FilterResults";
import Help from './components/help/Help'; 

const router = createBrowserRouter([
    {
        "path": "/",
        children: [
            {
                "path": "/",
                "element": <Home />,
            },
            {
                "path": "/building/:buildingName",
                "element": <Building />,
            },
            {
                "path": "/help",  
                "element": <Help />, 
            },
            {
                "path": "/building/:buildingName/room/:roomName",
                "element": <RoomInfo />,
            },
            {
                "path": "/search",
                "element": <SearchResults />,
            },
            {
                "path": "/my-account",
                "element": <Account />,
            },
            {
                "path": "/filters",
                "element": <FilterResults/>,
            },
            {
                "path": "*",
                "element": <Error />,
            }
        ]
    },
])


export function Router() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}