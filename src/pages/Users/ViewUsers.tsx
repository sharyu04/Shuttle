import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { IUser } from "../../interfaces/interfaces";
import { IContext, MyContext } from "../../MyContext";
import { useFetchUsers } from "../../hooks/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { deleteBuses } from "../../apis/apiCalls";

const ViewUsers = () => {
    const navigate = useNavigate()
    const { handleSetToken, handleSetUser } = React.useContext(MyContext) as IContext;
    const { userList }: { userList: IUser[] } = useFetchUsers()
    const { user } = React.useContext(MyContext) as IContext;
   const queryClient = useQueryClient() 

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
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role Id
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userList.map(userData => {
                                return <tr key={userData.id} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {userData.id}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {userData.first_name}
                                    </th>
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {userData.last_name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {userData.phone_number}
                                    </td>
                                    <td className="px-6 py-4">
                                        {userData.email}
                                    </td>
                                    <td className="px-6 py-4">
                                       {userData.role_id}
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
export default ViewUsers
