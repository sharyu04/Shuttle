import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../apis/apiCalls"
import { urls } from "../constants/constants"
import { company, IBus, IReservation, IUser, schedule, userDetails } from "../interfaces/interfaces"

export const useFetchCompanies = () => {
    const { data, error } = useQuery({
        queryKey: ["companies"],
        queryFn: () => fetch("http://localhost:3000/companies").then(res => res.json),
    })

    return { companies: data, error }
}

export const useFetchCompany = (id: number) => {
    const initialData: company = {
        id: 0,
        name: "",
        location: ""
    }
    const { data, error } = useQuery({
        initialData: initialData,
        queryKey: ["companies", id],
        queryFn: () => fetch(`http://localhost:3000/companies/${id}`).then(res => {
            const jsonBody = res.json()
            return jsonBody
        }).catch(err => {
            return err
        }),
    })

    if (error !== null) {
        console.log(error)
    }

    return { company: data }
}

export const useFetchSchedules = (user: userDetails | null) => {
    const navigate = useNavigate()
    const initialData: schedule[] = []
    const { data, error } = useQuery({
        initialData: initialData,
        queryKey: ["schedules", user],
        queryFn: () => api.get(urls.getSchedules).then(res => {
            return res.data
        }).catch(err => {
            console.log("err: ", err)
            navigate("/login")
            // toast.error("Login required!")
            return err
        }),
    })
    if (error != null) {
        navigate("/login")
        console.log(error.message)
        toast.error(error.message)
    }
    return { schedules: data }

}

export const useFetchReservations = () => {
    const initialData: IReservation[] = []
    const { data, error } = useQuery({
        initialData: initialData,
        queryKey: ["reservations"],
        queryFn: () => api.get(urls.getReservations).then(res => {
            console.log(res.data)
            return res.data

        }).catch(err => console.log(err))
    })
    if (error != null) {
        console.log(error)
    }
    return { reservations: data }
}

export const useFetchBuses = () => {
    const initialData: IBus[] = []
    const { data, error } = useQuery({
        initialData: initialData,
        queryKey: ["buses"],
        queryFn: () => api.get("http://localhost:3000/buses/").then(res => {
            console.log(res.data)
            return res.data
        }).catch(err => console.log(err))
    })

    if (error != null) {
        console.log(error)
    }
    return {buses: data}
}

export const useFetchUsers = () => {
    const initialData: IUser[] = []
    const { data, error } = useQuery({
        initialData: initialData,
        queryKey: ["buses"],
        queryFn: () => api.get("http://localhost:3000/users").then(res => {
            console.log(res.data)
            return res.data
        }).catch(err => console.log(err))
    })

    if (error != null) {
        console.log(error)
    }
    return {userList: data}
}