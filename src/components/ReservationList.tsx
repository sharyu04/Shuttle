import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteReservation } from "../apis/apiCalls";
import { IReservation } from "../interfaces/interfaces"
import { IContext, MyContext } from "../MyContext";
interface IProps {
    reservations: IReservation[];
}
const ReservationList = ({ reservations }: IProps) => {
    const { user } = React.useContext(MyContext) as IContext;
    const queryClient = useQueryClient()
    const [toggle, setToggle] = useState<Boolean>(false)
    const [id, setId] = useState<number>(0)
    const handleDeleteClick = (id: number, e: any) => {
        e.preventDefault()
        setId(id)
        setToggle(true)
    }
    const onConfirmDeletion = (e:any) => {
        e.preventDefault()
        deleteReservation(id, queryClient)
        setToggle(false)
    }
    const onCancelDeletion = (e:any) => {
        e.preventDefault()
        setToggle(false)
    }
    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className={`px-6 py-3 ${user?.role_id === 1 ? "hidden" : ""}`}>
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                From
                            </th>
                            <th scope="col" className="px-6 py-3">
                                To
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Arrival Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Departure Time
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reservations.map(resv => {
                                return <tr key={resv.id} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {resv.id}
                                    </th>
                                    <th scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${user?.role_id === 1 ? "hidden" : ""}`}>
                                        {resv.first_name} {resv.last_name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {resv.schedule.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        {resv.schedule.start_point}
                                    </td>
                                    <td className="px-6 py-4">
                                        {resv.schedule.company_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {resv.schedule.arrival_time}
                                    </td>
                                    <td className="px-6 py-4">
                                        {resv.schedule.departure_time}
                                    </td>
                                    <th scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${user?.role_id === 1 ? "hidden" : ""}`}>
                                        <button onClick={(e) => { handleDeleteClick(resv.id, e) }}>Delete</button>
                                    </th>
                                </tr>
                            }
                            )
                        }
                    </tbody>
                </table>

                <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${!toggle ? "hidden" : ""} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                    <div className="relative p-4 w-full max-w-2xl max-h-full">

                        <div className="flex flex-col text-lg block p-6 bg-white border border-gray-200 rounded-lg shadow w-2/3 m-auto mt-3">
                            <p>Are you sure you want to delete the reservation</p>
                            <div>
                                <button onClick={(e) => { onCancelDeletion(e) }} className="w-fit self-end bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    No
                                </button>
                                <button onClick={(e) => { onConfirmDeletion(e) }} className="w-fit self-end bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ReservationList
