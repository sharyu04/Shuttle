import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Schedule from './pages/Schedule/Schedule';
import SignUp from './pages/SignUp/SignUp';


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
        }
    ])
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
