import React, { useState } from "react";
import { createReservation } from "../apis/apiCalls";
import { ICreateReservation, schedule } from "../interfaces/interfaces"
import { IContext, MyContext } from "../MyContext";

import { useQueryClient } from "@tanstack/react-query";
// import { useFetchCompany } from "../hooks/hooks";

interface IProps {
    schedule: schedule
}
const ScheduleCard = ({ schedule }: IProps) => {
    const queryClient = useQueryClient()
    const { user } = React.useContext(MyContext) as IContext;
    const [toggle, setToggle] = useState<Boolean>(false)
    // const { company } = useFetchCompany(schedule.company_id)
    const onReserve = (e: any) => {
        e.preventDefault()
        setToggle(true)
    }

    const onConfirmReservation = (e:any) => {
        e.preventDefault()
        console.log("Schedule_id: ", schedule.id)
        console.log("User_id: ", user?.id)
        const reqBody: ICreateReservation = {
            schedule_id: schedule.id,
            user_id: user?.id
        }
        createReservation(reqBody, queryClient, user)
        setToggle(false)
    }
    const onCancelReservation = (e:any) => {
        e.preventDefault()
        setToggle(false)
    }

    return (
        <>
            <div className="flex flex-col text-lg block p-6 bg-white border border-gray-200 rounded-lg shadow w-2/3 m-auto mt-3">
                <p>Bus Id: <span className="font-semibold">{schedule.bus_id}</span></p>
                <div className="flex items-center">
                    <div className="m-4">
                        <p>from</p>
                        <h5 className="font-semibold">{schedule.start_point}</h5>
                        <p>{schedule.departure_time}</p>
                    </div>
                    <svg className="h-8 w-8 text-gray-900 m-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <div className="m-4">
                        <p>To</p>
                        <h5 className="font-semibold">{schedule.company_name}</h5>
                        <p>{schedule.company_location}</p>
                        <p>{schedule.arrival_time}</p>
                    </div>
                </div>
                <div className="w-fit self-end bg-transparent text-blue-700 py-2 px-4 border border-blue-500">
                    Seats available: {schedule.available_seats}
                </div>
                <button onClick={(e) => {onReserve(e)}} className="w-fit self-end bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Reserve
                </button>
            </div>

            {/* Modal */}

            <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${!toggle ? "hidden":""} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">

                    <div className="flex flex-col text-lg block p-6 bg-white border border-gray-200 rounded-lg shadow w-2/3 m-auto mt-3">
                        <p>Bus Id: <span className="font-semibold">{schedule.bus_id}</span></p>
                        <div className="flex items-center">
                            <div className="m-4">
                                <p>from</p>
                                <h5 className="font-semibold">{schedule.start_point}</h5>
                                <p>{schedule.departure_time}</p>
                            </div>
                            <svg className="h-8 w-8 text-gray-900 m-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            <div className="m-4">
                                <p>To</p>
                                <h5 className="font-semibold">{schedule.company_name}</h5>
                                <p>{schedule.company_location}</p>
                                <p>{schedule.arrival_time}</p>
                            </div>
                        </div>

                        <div>
                        <button onClick={(e) => {onCancelReservation(e)}} className="w-fit self-end bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                           Cancel
                        </button>
                        <button onClick={(e) => {onConfirmReservation(e)}} className="w-fit self-end bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Confirm Reservation
                        </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ScheduleCard
