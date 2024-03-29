import { useEffect } from "react";
import Navbar from "../../components/Navbar"
import ScheduleCard from "../../components/ScheduleCard"
import { useFetchSchedules } from "../../hooks/hooks"
import { schedule } from "../../interfaces/interfaces";

const Schedule = () => {
    const {schedules}:{schedules: schedule[]} = useFetchSchedules();
    useEffect(() => {
            console.log("schedules: ",schedules)
        },[schedules])
    return (
        <>
            <Navbar />
            <ScheduleCard />
        </>
    )
}
export default Schedule
