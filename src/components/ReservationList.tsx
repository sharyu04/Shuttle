import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteReservation } from "../apis/apiCalls";
import { IReservation } from "../interfaces/interfaces"
import { IContext, MyContext } from "../MyContext";
interface IProps {
    reservations: IReservation[];
}
const ReservationList = ({ reservations }: IProps) => {
    const { user } = React.useContext(MyContext) as IContext;
   const queryClient = useQueryClient() 
    const handleDeleteClick = (id: number,e: any) => {
            e.preventDefault()
            deleteReservation(id, queryClient) 
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
                                       <button onClick={(e) => {handleDeleteClick(resv.id,e)}}>Delete</button> 
                                    </th>
                                </tr>
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}
export default ReservationList
