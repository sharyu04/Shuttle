import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar"
import ReservationList from "../../components/ReservationList"
import { useFetchReservations } from "../../hooks/hooks";
import { IReservation } from "../../interfaces/interfaces";
import { IContext, MyContext } from "../../MyContext";

const UserReservations = () => {
    const navigate = useNavigate()
    const { user, handleSetToken, handleSetUser } = React.useContext(MyContext) as IContext;
    useEffect(() => {
        const token = localStorage.getItem("token")
        const userLocalStorage = localStorage.getItem("user")
        if (token !== null && userLocalStorage !== null) {
            handleSetToken(token)
            handleSetUser(JSON.parse(userLocalStorage))
        }
        else {
            navigate("/login")
            toast.error("Please Login")
        }
    }, [])
    const { reservations } = useFetchReservations();
    const [filteredReservations, setFilteredReservations] = useState<IReservation[]>([])
    useEffect(() => {
        const filteredData = reservations.filter((resv: IReservation) => {
            return resv.user_id === user?.id
        })
        setFilteredReservations(filteredData)
    }, [reservations, user])
    return (
        <>
            <Navbar />
            <ReservationList reservations={filteredReservations} />
        </>
    )
}
export default UserReservations
