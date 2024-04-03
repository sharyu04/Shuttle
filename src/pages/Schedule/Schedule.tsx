import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar"
import ScheduleList from "../../components/ScheduleList"
import { IContext, MyContext } from "../../MyContext";

const Schedule = () => {

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
            toast.error("Please Login")
        }
    }, [])
    return (
        <>
            <Navbar />
            <ScheduleList />
        </>
    )
}
export default Schedule
