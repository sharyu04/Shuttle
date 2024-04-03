import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { IBus, userDetails } from "../../interfaces/interfaces";
import { IContext, MyContext } from "../../MyContext";
import { useFetchBuses } from "../../hooks/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { deleteBuses } from "../../apis/apiCalls";
import { toast } from "react-toastify";

const ViewBuses = () => {
    const { buses }: { buses: IBus[] } = useFetchBuses()
    const queryClient = useQueryClient()
    const [toggle, setToggle] = useState<Boolean>(false)
    const [id, setId] = useState<number>(0)
    const [searchKey, setSearchKey] = useState<string>("")
    const navigate = useNavigate()
    const { user, handleSetToken, handleSetUser } = React.useContext(MyContext) as IContext;
    useEffect(() => {
        const token = localStorage.getItem("token")
        const userLocalStorage = localStorage.getItem("user")
        if (token !== null && userLocalStorage !== null) {
            handleSetToken(token)
            handleSetUser(JSON.parse(userLocalStorage))
            const userData: userDetails = JSON.parse(userLocalStorage)
            if (userData === null || userData.role_id !== 2) {
                navigate("/")
                toast.error("You are not authorized to access this url")
            }
        }
        else {
            navigate("/login")
            toast.error("Please login")
        }

    }, [])
    const handleDeleteClick = (id: number, e: any) => {
        e.preventDefault()
        setId(id)
        setToggle(true)
    }
    const onConfirmDeletion = (e: any) => {
        e.preventDefault()
        deleteBuses(id, queryClient)
        setToggle(false)
    }
    const onCancelDeletion = (e: any) => {
        e.preventDefault()
        setToggle(false)
    }

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
    return (
        <>
            <Navbar />

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
                </div>
            </form>


            <div className="relative overflow-x-auto w-3/4 m-auto mt-8">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Model
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Capacity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Company Id
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buses.filter(bus => {
                                return searchKey === "" ? bus : (bus.model.toLowerCase().includes(searchKey.toLowerCase()) || bus.number.toLowerCase().includes(searchKey.toLowerCase()) || bus.id === Number(searchKey) || bus.company_id === Number(searchKey) || bus.capacity === Number(searchKey))
                            }).map(bus => {
                                return <tr key={bus.id} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {bus.id}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {bus.number}
                                    </th>
                                    <td className="px-6 py-4">
                                        {bus.model}
                                    </td>
                                    <td className="px-6 py-4">
                                        {bus.capacity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {bus.company_id}
                                    </td>
                                    <td className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${user?.role_id === 1 ? "hidden" : ""}`}>
                                        <button onClick={(e) => { handleDeleteClick(bus.id, e) }}>Delete</button>
                                    </td>
                                </tr>
                            }
                            )
                        }
                    </tbody>
                </table>

                <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${!toggle ? "hidden" : ""} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                    <div className="relative p-4 w-full max-w-2xl max-h-full inset-x-1/3 inset-y-1/4">

                        <div className="flex flex-col text-lg block p-6 bg-white border border-gray-200 rounded-lg shadow w-2/3 m-auto mt-3">
                            <p>Are you sure you want to delete the bus ?</p>
                            <div className="flex justify-end mt-3">
                                <button onClick={(e) => { onCancelDeletion(e) }} className="w-fit self-end bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4">
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
export default ViewBuses
