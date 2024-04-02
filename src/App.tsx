import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import MyContextProvider from './MyContext';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Schedule from './pages/Schedule/Schedule';
import SignUp from './pages/SignUp/SignUp';
import Create from './pages/Create/Create';
import UserReservations from './pages/ViewReservations/UserReservations';
import AdminReservationList from './pages/ViewReservations/AdminReservationList';
import ViewBuses from './pages/Buses/ViewBuses';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ViewUsers from './pages/Users/ViewUsers';


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/signup",
            element: <SignUp />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/schedule",
            element: <Schedule />
        },
        {
            path: "/create",
            element: <Create />
        },
        {
            path: "/user_reservations",
            element: <UserReservations />
        },
        {
            path: "/all_reservations",
            element: <AdminReservationList />
        },
        {
            path: "/buses",
            element: <ViewBuses />
        },
        {
            path: "/users",
            element: <ViewUsers />
        }
    ])
    return (
        <MyContextProvider>
            <div className="App">
                <RouterProvider router={router} />
            </div>
            <ToastContainer/>
        </MyContextProvider>
    );
}

export default App;
