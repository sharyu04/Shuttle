import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { IUser } from "../../interfaces/interfaces";
import { IContext, MyContext } from "../../MyContext";
import { useFetchUsers } from "../../hooks/hooks";

const ViewUsers = () => {
    const navigate = useNavigate()
    const { handleSetToken, handleSetUser } = React.useContext(MyContext) as IContext;
    const { userList }: { userList: IUser[] } = useFetchUsers()
    const [searchKey, setSearchKey] = useState<string>("")

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
                            <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search users ..." value={searchKey} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.preventDefault()
                                setSearchKey(e.target.value)
                                console.log(searchKey)
                            }} />
                        </div>
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
                            userList.filter(user => {
                                return searchKey === "" ? user : (user.first_name.toLowerCase().includes(searchKey.toLowerCase()) || user.last_name.toLowerCase().includes(searchKey.toLowerCase()) || user.email.toLowerCase().includes(searchKey.toLowerCase()) || user.phone_number.toLowerCase().includes(searchKey.toLowerCase()) || user.id === Number(searchKey) || user.role_id === Number(searchKey))
                            }).map(userData => {
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
