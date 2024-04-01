import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { IBus } from "../../interfaces/interfaces";
import { IContext, MyContext } from "../../MyContext";
import { useFetchBuses } from "../../hooks/hooks";

const ViewBuses = () => {
    const navigate = useNavigate()
    const { handleSetToken, handleSetUser } = React.useContext(MyContext) as IContext;
    const { buses }: { buses: IBus[] } = useFetchBuses()
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

            <div className="relative overflow-x-auto">
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buses.map(bus => {
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
export default ViewBuses
