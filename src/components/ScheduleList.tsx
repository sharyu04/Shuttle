import { useEffect } from "react";
import { useFetchSchedules } from "../hooks/hooks";
import { schedule } from "../interfaces/interfaces";
import ScheduleCard from "./ScheduleCard";

const ScheduleList = () => {
    const {schedules}:{schedules: schedule[]} = useFetchSchedules();
    useEffect(() => {
            console.log("schedules: ",schedules)
        },[schedules])
    return (
        <>
          {
            schedules.map(schedule => <ScheduleCard key={schedule.id} schedule = {schedule}/>)
              }
        </>
    )
}
export default ScheduleList
