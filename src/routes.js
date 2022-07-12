
import { lazy } from "react";

const Signup = lazy(() =>
    import('./Pages/Signup/Signup'));

const NotFound = lazy(() =>
    import('./Pages/NotFound/NotFound'));

const routes = [
    {
        path: "/",
        component: <Signup />,
        exact: true,
    },
    {
        path: "/signup",
        component: <Signup />,
        exact: true,
    },
    {
        path: "*",
        component: <NotFound />,
        exact: true
    },
];

export default routes;