import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../apis/apiCalls"
import { urls } from "../constants/constants"
import { schedule } from "../interfaces/interfaces"

export const useFetchCompanies = () => {
    const { data, error } = useQuery({
        queryKey: ["companies"],
        queryFn: () => fetch("http://localhost:3000/companies").then(res => res.json),
    })

    return { companies: data, error }
}

export const useFetchSchedules = () => {
    const navigate = useNavigate()
    const initialData: schedule[] = []
    const { data, error } = useQuery({
        initialData: initialData,
        queryKey: ["schedules"],
        queryFn: () => api.get(urls.getSchedules).then(res => {
            return res.data
        }).catch(err => {
            console.log("err: ",err)
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
