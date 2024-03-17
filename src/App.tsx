import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
    const router = createBrowserRouter([
        {
            path: "/signup",
            element: <SignUp />
        },
        {
            path: "/login",
            element: <Login />
        }
    ])
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
