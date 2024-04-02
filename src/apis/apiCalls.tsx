import { QueryClient } from "@tanstack/react-query"
import axios from "axios"
import { NavigateFunction } from "react-router-dom"
import { toast } from "react-toastify"
import { ICreateCompany, ICreateReservation, userDetails, userLoginBody, userSignUpBody, ICreateBus, ICreateSchedule } from "../interfaces/interfaces"

var bearerToken = ""
export const postUser = (user: userSignUpBody, navigate: any) => {
    const response = fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user })
    })
    response.then(async (res) => {
        const respJson = await res.json()
        if (res.status === 201) {
            navigate("/login")
            toast.success("User registered successfully!")
        }
        else {
            respJson.map((resText: string) => toast.error(resText))
        }
    })
        .catch(err => {
            console.log("postUser err: ", err)
        }
        )
}

export const employeeLogin = (user: userLoginBody, navigate: NavigateFunction, handleSetUser: (user: userDetails) => void) => {
    const response = fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user })
    })
    response.then(async (res) => {
        const respJson = await res.json()
        if (res.status === 202) {
            bearerToken = respJson.token
            handleSetUser(respJson.user)
            localStorage.setItem("token", JSON.stringify(bearerToken))
            localStorage.setItem("user", JSON.stringify(respJson.user))
            navigate("/schedule")
        } else if (res.status === 404) {
            toast.error("Invalid Email")
        } else {
            toast.error(respJson.error)
        }
    }).catch(err => console.log("err: ", err))
}

const api = axios.create({
    baseURL: 'http://localhost:3001',
})

api.interceptors.request.use(config => {
    const accessToken = JSON.parse(localStorage.getItem("token") || "");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
})


export const createReservation = (reservationBody: ICreateReservation, queryClient: any, user: userDetails | null) => {
    const body = { reservation: reservationBody }
    const response = api.post('http://localhost:3000/reservations', body)
    response.then(async(res) => {
        await queryClient.refetchQueries({
            queryKey: ["schedules", user]
        })
        console.log("Reservation success")
         toast.success("Reservation successfull")
        
    }).catch(err => {
        console.log(err.response.data[0])
        toast.error(err.response.data[0])
    })
}

export const createCompany = (company: ICreateCompany) => {
    const body = { company: company }
    const response = api.post('http://localhost:3000/companies', body)
    response.then(res => {
        return toast.success("Company created successfully!")
    })
        .catch(err => toast.error(err.response.data[0]))
}

export const createBus = (bus: ICreateBus) => {
    const body = { bus: bus }
    const response = api.post('http://localhost:3000/buses/', body)
    response.then(res => {
        return toast.success("Bus created successfully!")
    })
        .catch(err => toast.error(err.response.data[0]))
}

export const createSchedule = (schedule: ICreateSchedule) => {
    const body = { schedule: schedule }
    const response = api.post('http://localhost:3000/schedules', body)
    response.then(res => {
        return toast.success("Schedule created successfully!")
    })
        .catch(err => toast.error(err.response.data.message))
}

export const deleteReservation = (id: number, queryClient: any) => {
    const response = api.delete(`http://localhost:3000/reservations/${id}`)
    response.then(res => {
        queryClient.refetchQueries({
            queryKey: ["reservations"]
        })
        return console.log(res.data.message)
    }).catch(err => console.log(err))
}

export const deleteBuses = (id: number, queryClient: any) => {
    const response = api.delete(`http://localhost:3000/buses/${id}`)
    response.then(res => {
        queryClient.refetchQueries({
            queryKey: ["buses"]
        })
        return console.log(res.data.message)
    }).catch(err => console.log(err))
}

export default api
