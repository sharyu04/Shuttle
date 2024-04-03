import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { deleteReservation } from "../apis/apiCalls";
import { sortByValues } from "../constants/constants";
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
    const [sortBy, setSortBy] = useState<string>(sortByValues.id)
    const [searchKey, setSearchKey] = useState<string>("")
    const [sortedReservations, setSortedReservations] = useState<IReservation[]>([])

    useEffect(() => {
        var newSortedReservations: IReservation[] = []
        switch (sortBy) {
            case sortByValues.userName:
                newSortedReservations = [...reservations].sort((a, b) => {
                    if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) { return 1; }
                    else if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) { return -1; }
                    else return 0;
                })
                break;
            case sortByValues.from:
                newSortedReservations = [...reservations].sort((a, b) => {
                    if (a.schedule.start_point.toLowerCase() > b.schedule.start_point.toLowerCase()) { return 1; }
                    else if (a.schedule.start_point.toLowerCase() < b.schedule.start_point.toLowerCase()) { return -1; }
                    else return 0;
                })
                break;
            case sortByValues.departure_time:
                newSortedReservations = [...reservations].sort((a, b) => {
                    if (a.schedule.departure_time.toLowerCase() > b.schedule.departure_time.toLowerCase()) { return 1; }
                    else if (a.schedule.departure_time.toLowerCase() < b.schedule.departure_time.toLowerCase()) { return -1; }
                    else return 0;
                })
                break;
            case sortByValues.arrival_time:
                newSortedReservations = [...reservations].sort((a, b) => {
                    if (a.schedule.arrival_time.toLowerCase() > b.schedule.arrival_time.toLowerCase()) { return 1; }
                    else if (a.schedule.arrival_time.toLowerCase() < b.schedule.arrival_time.toLowerCase()) { return -1; }
                    else return 0;
                })
                break;
            case sortByValues.to:
                newSortedReservations = [...reservations].sort((a, b) => {
                    if (a.schedule.company_name.toLowerCase() > b.schedule.company_name.toLowerCase()) { return 1; }
                    else if (a.schedule.company_name.toLowerCase() < b.schedule.company_name.toLowerCase()) { return -1; }
                    else return 0;
                })
                break;
            default:
                newSortedReservations = [...reservations].sort((a, b) => {
                    if (a.id > b.id) { return 1; }
                    else if (a.id < b.id) { return -1; }
                    else return 0;
                })
                break;
        }
        setSortedReservations(newSortedReservations)
    }, [reservations, sortBy])
    const handleDeleteClick = (id: number, e: any) => {
        e.preventDefault()
        setId(id)
        setToggle(true)
    }
    const onConfirmDeletion = (e: any) => {
        e.preventDefault()
        deleteReservation(id, queryClient)
        setToggle(false)
    }
    const onCancelDeletion = (e: any) => {
        e.preventDefault()
        setToggle(false)
    }
    return (
        <>

            <form className="w-9/12 mx-auto">
                <div className="flex items-center justify-between">

                    <div className="flex">
                        <div className="relative w-full">
                            <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search reservations ..." value={searchKey} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.preventDefault()
                                setSearchKey(e.target.value)
                                console.log(searchKey)
                            }} />
                        </div>
                    </div>

                    <div>
                        <select id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onChange={(e) => { setSortBy(e.target.value) }} className="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" ><svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>

                            <option className="block px-4 py-2 hover:bg-gray-100" value={sortByValues.id} style={{ cursor: "pointer" }} >
                                Id
                            </option>
                            <option className={`block px-4 py-2 hover:bg-gray-100 ${user?.role_id === 1 ? "hidden" : ""}`} value={sortByValues.userName} style={{ cursor: "pointer" }} >
                                Name
                            </option>
                            <option className="block px-4 py-2 hover:bg-gray-100" value={sortByValues.from} style={{ cursor: "pointer" }} >
                                From
                            </option>
                            <option className="block px-4 py-2 hover:bg-gray-100" value={sortByValues.arrival_time} style={{ cursor: "pointer" }} >
                                Arrival Time
                            </option>
                            <option className="block px-4 py-2 hover:bg-gray-100" value={sortByValues.departure_time} style={{ cursor: "pointer" }} >
                                Departure Time
                            </option>
                            <option className="block px-4 py-2 hover:bg-gray-100" value={sortByValues.to} style={{ cursor: "pointer" }} >
                                Company
                            </option>

                        </select>
                    </div>
                </div>
            </form>

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
                            <th scope="col" className={`px-6 py-3 ${user?.role_id === 1 ? "hidden" : ""}`}>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedReservations.filter(resv => {
                                return searchKey === "" ? resv : (resv.schedule.start_point.toLowerCase().includes(searchKey.toLowerCase()) || resv.schedule.company_name.toLowerCase().includes(searchKey.toLowerCase()) || resv.schedule.arrival_time.toLowerCase().includes(searchKey.toLowerCase()) || resv.schedule.departure_time.toLowerCase().includes(searchKey.toLowerCase()) || resv.schedule.date.toLowerCase().includes(searchKey.toLowerCase()) || resv.first_name.toLowerCase().includes(searchKey.toLowerCase()) || resv.last_name.toLowerCase().includes(searchKey.toLowerCase()) || resv.id === Number(searchKey))
                            }).map(resv => {
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
