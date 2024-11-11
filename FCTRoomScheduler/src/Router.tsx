import {
    createBrowserRouter, Outlet, RouterProvider,
} from 'react-router-dom'
import React from 'react'
import Home from "./components/home/Home";

const router = createBrowserRouter([
    {
        "path": "/",
        children: [
            {
                "path": "/",
                "element": <Home />,
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