import { createBrowserRouter } from "react-router-dom";

import Login from "@/pages/Login";
import GeekLayout from "@/pages/Layout";
import AuthRoute from "@/components/AuthRoute";
import { lazy, Suspense } from "react";

const HomeLazy = lazy(() => import('@/pages/Home'))
const PublishLazy = lazy(() => import('@/pages/Publish'))
const ArticleLazy = lazy(() => import('@/pages/Article'))

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
                element: <Suspense fallback="加载中..."><ArticleLazy /></Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback="加载中..."><PublishLazy /></Suspense>
            },
            {
                index: true,
                element: <Suspense fallback="加载中..."><HomeLazy /></Suspense>
            },
        ]
    }
])

export default router