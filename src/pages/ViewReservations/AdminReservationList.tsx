import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import ReservationList from "../../components/ReservationList";
import { useFetchReservations } from "../../hooks/hooks";
import { userDetails } from "../../interfaces/interfaces";
import { IContext, MyContext } from "../../MyContext";

const AdminReservationList = () => {
    const navigate = useNavigate()
    const { user, handleSetToken, handleSetUser } = React.useContext(MyContext) as IContext;
    useEffect(() => {
        const token = localStorage.getItem("token")
        const userLocalStorage = localStorage.getItem("user")
        if (token !== null && userLocalStorage !== null) {
            handleSetToken(token)
            handleSetUser(JSON.parse(userLocalStorage))
            const userData: userDetails = JSON.parse(userLocalStorage)
            if (userData === null || userData.role_id !== 2) {
                console.log("user role = ",user?.role_id)
                navigate("/")
                toast.error("You are not authorized to access this url")
            }
        }
        else {
            navigate("/login")
            toast.error("Please login")
        }

    }, [])
    const { reservations } = useFetchReservations();
    return (
        <>
            <Navbar />
            <ReservationList reservations={reservations} />
        </>
    )
}
export default AdminReservationList
