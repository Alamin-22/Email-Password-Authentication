import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Components/Home/Home";
import Layout from "../Layout/Layout";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import DaisyRegister from "../DaisyForm/DaisyRegister";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path:"/d_register",
                element:<DaisyRegister></DaisyRegister>
            }
        ]
    },
]);

export default router;