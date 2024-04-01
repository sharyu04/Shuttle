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
    const [sortDropdown, setSortDropdown] = useState<Boolean>(false)
    const [sortBy, setSortBy] = useState<string>(sortByValues.busId)
    const [searchBy, setSearchBy] = useState<string>(sortByValues.busId)

    useEffect(() => {
        console.log("schedules: ", schedules)
    }, [schedules])
    return (
        <>

            <form className="max-w-lg mx-auto">
                <div className="flex">
                    <div>
                        <button onClick={() => { setSearchDropdown(!searchDropdown) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Search By<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                        </button>

                        <div id="dropdown" className={`z-10 ${!searchDropdown ? "hidden" : ""} bg-white divide-y divide-gray-100 rounded-lg shadow absolute`}>
                            <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                                <li onClick={() => { setSearchBy(sortByValues.busId) }} style={{ cursor: "pointer" }} >
                                    <p className="block px-4 py-2 hover:bg-gray-100" >Bus Id</p>
                                </li>
                                <li onClick={() => { setSearchBy(sortByValues.from) }} style={{ cursor: "pointer" }} >
                                    <p className="block px-4 py-2 hover:bg-gray-100" >From</p>
                                </li>
                                <li onClick={() => { setSearchBy(sortByValues.to) }} style={{ cursor: "pointer" }} >
                                    <p className="block px-4 py-2 hover:bg-gray-100" >To</p>
                                </li>
                                <li onClick={() => { setSearchBy(sortByValues.arrival_time) }} style={{ cursor: "pointer" }} >
                                    <p className="block px-4 py-2 hover:bg-gray-100" >Arrival Time</p>
                                </li>
                                <li onClick={() => { setSearchBy(sortByValues.departure_time) }} style={{ cursor: "pointer" }} >
                                    <p className="block px-4 py-2 hover:bg-gray-100" >Departure Time</p>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className="relative w-full">
                        <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                        {
                            // <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            //     <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            //         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            //     </svg>
                            //     <span className="sr-only">Search</span>
                            // </button>
                        }

                        <div>
                            <button onClick={() => { setSortDropdown(!sortDropdown) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Search By<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                            </button>

                            <div id="dropdown" className={`z-10 ${!sortDropdown ? "hidden" : ""} bg-white divide-y divide-gray-100 rounded-lg shadow absolute`}>
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                                    <li onClick={() => { setSortBy(sortByValues.busId) }} style={{ cursor: "pointer" }} >
                                        <p className="block px-4 py-2 hover:bg-gray-100" >Bus Id</p>
                                    </li>
                                    <li onClick={() => { setSortBy(sortByValues.from) }} style={{ cursor: "pointer" }} >
                                        <p className="block px-4 py-2 hover:bg-gray-100" >From</p>
                                    </li>
                                    <li onClick={() => { setSortBy(sortByValues.to) }} style={{ cursor: "pointer" }} >
                                        <p className="block px-4 py-2 hover:bg-gray-100" >To</p>
                                    </li>
                                    <li onClick={() => { setSortBy(sortByValues.arrival_time) }} style={{ cursor: "pointer" }} >
                                        <p className="block px-4 py-2 hover:bg-gray-100" >Arrival Time</p>
                                    </li>
                                    <li onClick={() => { setSortBy(sortByValues.departure_time) }} style={{ cursor: "pointer" }} >
                                        <p className="block px-4 py-2 hover:bg-gray-100" >Departure Time</p>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {
                schedules.map(schedule => <ScheduleCard key={schedule.id} schedule={schedule} />)
            }
        </>
    )
}
export default ScheduleList
