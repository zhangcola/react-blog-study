import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/Login";
import GeekLayout from "@/pages/Layout";
import AuthRoute from "@/components/AuthRoute";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import Home from "@/pages/Home";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <AuthRoute><GeekLayout /></AuthRoute>
        , children: [  // 二级路由
            {
                path: 'article',
                element: <Article />
            },
            {
                path: 'publish',
                element: <Publish />
            },
            {
                index: true,
                element: <Home />
            },
        ]
    }
])

export default router