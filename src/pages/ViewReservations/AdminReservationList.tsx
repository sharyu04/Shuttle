import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ReservationList from "../../components/ReservationList";
import { useFetchReservations } from "../../hooks/hooks";
import { IContext, MyContext } from "../../MyContext";

const AdminReservationList = () => {
    const navigate = useNavigate()
    const { handleSetToken, handleSetUser } = React.useContext(MyContext) as IContext;
    useEffect(() => {
        const token = localStorage.getItem("token")
        const userLocalStorage = localStorage.getItem("user")
        if (token !== null && userLocalStorage !== null) {
            handleSetToken(token)
            handleSetUser(JSON.parse(userLocalStorage))
        }
        else {
            navigate("/login")
        }
    }, [])
    const {reservations} = useFetchReservations();
    return (
        <>
            <Navbar />
            <ReservationList reservations={reservations}/>
        </>
    )
}
export default AdminReservationList
