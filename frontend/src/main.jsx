import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import "./index.css";
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard/Home';
import Notifications from './pages/Dashboard/Notification';
import Calender from './pages/Dashboard/Calender';
import Notes from './pages/Dashboard/Note';
import Transfer from './pages/Dashboard/Transfer';
import Analithyc from './pages/Dashboard/Analithyc';
import Activity from './pages/Dashboard/Activity';
import Setting from './pages/Dashboard/Setting';
import Logout from './pages/Dashboard/Logout';
import Receipt from './pages/Dashboard/Receipt';
import PlanSetUp from './pages/Dashboard/Plan/Setup';
import Plan from './pages/Dashboard/Plan';
import Personalisasi from './pages/Dashboard/Plan/Personalisasi';
import NoteSetUp from './pages/Dashboard/Note/Setup';
import NotePersonalization from './pages/Dashboard/Note/Personalization';
import PaymentSetUp from './pages/Dashboard/Transfer/Setup';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/auth",
        element: <Auth />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/dashboard/notification",
        element: <Notifications />
    },
    {
        path: "/dashboard/calender",
        element: <Calender />
    },
    {
        path: "/dashboard/note",
        element: <Notes />
    },
    {
        path: "/dashboard/note/setup",
        element: <NoteSetUp />
    },
    {
        path: "/dashboard/note/setup/personalization/:note",
        element: <NotePersonalization/>
    },
    {
        path: "/dashboard/payment",
        element: <Transfer />
    },
    {
        path: "/dashboard/payment/:payment",
        element: <PaymentSetUp />
    },
    {
        path: "/dashboard/transfer/receipt",
        element: <Receipt />
    },
    {
        path: "/dashboard/analithyc",
        element: <Analithyc />
    },
    {
        path: "/dashboard/plan",
        element: <Plan />
    },
    {
        path: "/dashboard/plan/setup",
        element: <PlanSetUp/>
    },
    {
        path: "/dashboard/plan/setup/personalization/:wallet",
        element: <Personalisasi/>
    },
    {
        path: "/dashboard/activity",
        element: <Activity />
    },
    {
        path: "/dashboard/setting",
        element: <Setting />
    },
    {
        path: "/dashboard/logout",
        element: <Logout />
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
