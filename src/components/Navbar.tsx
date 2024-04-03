import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { IContext, MyContext } from "../MyContext";
import BusLogo from "../assets/BusLogo.png"
import { pages } from "../constants/constants";

const Navbar = () => {
    const navigate = useNavigate()
    const {user} = React.useContext(MyContext) as IContext; 
    const location = useLocation()
    return (
        <>
            <nav className="sticky bg-white w-full z-20 top-0 start-0 border-b border-gray-200 mb-4">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    <div className="flex items-center">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={BusLogo} className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">Shuttle</span>
                        </div>
                        <div className="items-center hidden mx-20 w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                                <li>
                                    <Link to="/" className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${location.pathname===pages.Home ? "text-blue-700" : "text-gray-900 " }`} aria-current="page">Home</Link>
                                </li>
                                <li>
                                    <Link to="/create" className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${location.pathname===pages.Create ? "text-blue-700" : "text-gray-900 " } ${ user !== null && user.role_id === 1 ? "hidden" : ""}`} >Create</Link>
                                </li>
                                <li>
                                    <Link to="/user_reservations" className={`block py-2 px-3  ${location.pathname===pages.MyReservations ? "text-blue-700" : "text-gray-900 " } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${ user !== null && user.role_id === 1 ? "" : "hidden"}`} >My reservations</Link>
                                </li>
                                <li>
                                    <Link to="/all_reservations" className={`block py-2 px-3 ${location.pathname===pages.ViewReservations ? "text-blue-700" : "text-gray-900 " } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${ user !== null && user.role_id === 1 ? "hidden" : ""}`} >View reservations</Link>
                                </li>
                                <li>
                                    <Link to="/buses" className={`block py-2 px-3 ${location.pathname===pages.ViewBuses ? "text-blue-700" : "text-gray-900 " } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${ user !== null && user.role_id === 1 ? "hidden" : ""}`} >View Buses</Link>
                                </li>
                                <li>
                                    <Link to="/users" className={`block py-2 px-3 ${location.pathname===pages.ViewUsers ? "text-blue-700" : "text-gray-900 " } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ${ user !== null && user.role_id === 1 ? "hidden" : ""}`} >View Users</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div onClick={()=>{
                        localStorage.removeItem("token")
                        localStorage.removeItem("user")
                        navigate("/login")
                        }} className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                       <svg className="h-5 w-5 text-white-900" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg> </button>
                    </div>
                </div>
            </nav>

        </>
    )
}
export default Navbar
