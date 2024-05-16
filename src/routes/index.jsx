import { useRoutes } from "react-router-dom"
import Register from "../components/pages/Register"
import Login from "../components/pages/Login"
import Dashboard from "../components/pages/Dashboard"

export default function Router() {

    return useRoutes([
        {
            path: "/",
            element: (  
                <Register />
            ),

        },
        {
            path: "/login",
            element: (
                <Login />
            ),

        },
        {
            path: "/dashboard",
            element: (
                <Dashboard />
            ),

        },

    ])
}


