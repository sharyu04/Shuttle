import React, { useEffect, useState } from "react";
import { sortByValues } from "../constants/constants";
import { useFetchSchedules } from "../hooks/hooks";
import { schedule } from "../interfaces/interfaces";
import { IContext, MyContext } from "../MyContext";
import ScheduleCard from "./ScheduleCard";

const ScheduleList = () => {

    const { user } = React.useContext(MyContext) as IContext;
    const { schedules }: { schedules: schedule[] } = useFetchSchedules(user);
    const [searchDropdown, setSearchDropdown] = useState<Boolean>(false)
    const [sortBy, setSortBy] = useState<string>(sortByValues.busId)
    const [searchBy, setSearchBy] = useState<string>(sortByValues.from)
    const [searchKey, setSearchKey] = useState<string>("")
    const [sortedSchedules, setSortedSchedules] = useState<schedule[]>([])

    useEffect(() => {
        console.log(schedules)
        var newSortedSchedule: schedule[] = []
        switch (sortBy) {
            case sortByValues.busId:
                newSortedSchedule = [...schedules].sort((a, b) => {
                    if (a.bus_id > b.bus_id) { return 1; }
                    else if (a.bus_id < b.bus_id) { return -1; }
                    else return 0;
                })
                break;
            case sortByValues.from:
                newSortedSchedule = [...schedules].sort((a, b) => {
                    if (a.start_point.toLowerCase() > b.start_point.toLowerCase()) { return 1; }
                    else if (a.start_point.toLowerCase() < b.start_point.toLowerCase()) { return -1; }
                    else return 0;
                })
                break;
            case sortByValues.arrival_time:
                newSortedSchedule = [...schedules].sort((a, b) => {
                    if (a.arrival_time > b.arrival_time) { return 1; }
                    else if (a.arrival_time < b.arrival_time) { return -1; }
                    else return 0;
                })
                break;
            case sortByValues.departure_time:
                newSortedSchedule = [...schedules].sort((a, b) => {
                    if (a.departure_time > b.departure_time) { return 1; }
                    else if (a.departure_time < b.departure_time) { return -1; }
                    else return 0;
                })
                break;
            case sortByValues.available_seats:
                newSortedSchedule = [...schedules].sort((a, b) => {
                    if (a.available_seats > b.available_seats) { return 1; }
                    else if (a.available_seats < b.available_seats) { return -1; }
                    else return 0;
                })
                break;
        }
        setSortedSchedules(newSortedSchedule)
    }, [schedules, sortBy])
    return (
        <>

            <form className="max-w-lg mx-auto">
                <div className="flex">
                    <div>
                        <select onClick={() => { setSearchDropdown(!searchDropdown) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" ><svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>

                            <option className="block px-4 py-2 hover:bg-gray-100" onClick={() => { setSearchBy(sortByValues.from) }} style={{ cursor: "pointer" }} >
                                From
                            </option>
                            <option className="block px-4 py-2 hover:bg-gray-100" onClick={() => { setSearchBy(sortByValues.busId) }} style={{ cursor: "pointer" }} >
                                Bus Id
                            </option>
                        </select>
                    </div>

                    <div className="relative w-full">
                        <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." value={searchKey} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault()
                            setSearchKey(e.target.value)
                            console.log(searchKey)
                        }} />

                        <div>
                            <select id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onChange={(e) => { setSortBy(e.target.value) }} className="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" ><svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>

                                <option className="block px-4 py-2 hover:bg-gray-100" value={sortByValues.busId} style={{ cursor: "pointer" }} >
                                    Bus Id
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
                                <option className="block px-4 py-2 hover:bg-gray-100" value={sortByValues.available_seats} style={{ cursor: "pointer" }} >
                                    Available Seats
                                </option>

                            </select>
                        </div>
                    </div>
                </div>
            </form>

            {

                sortedSchedules.filter(schedule => {
                    switch (searchBy) {
                        case sortByValues.busId:
                            return searchKey === "" ? schedule : schedule.bus_id === Number(searchKey)
                        default:
                            return searchKey === "" ? schedule : schedule.start_point.toLowerCase().includes(searchKey.toLowerCase())
                    }
                }).map(schedule => <ScheduleCard key={schedule.id} schedule={schedule} />)
            }

            
        </>
    )
}
export default ScheduleList
