import axios from "axios"
import { NavigateFunction } from "react-router-dom"
import { toast } from "react-toastify"
import { ICreateReservation, userDetails, userLoginBody, userSignUpBody } from "../interfaces/interfaces"

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
    response.then(res => {
        queryClient.refetchQueries({
            queryKey: ["schedules", user]
        })
        toast("Reservation successfull")
        return console.log(res.data)
    }).catch(err => {
        // if()
        toast.error(err.response.data[0])
        return console.log("err: ", err.response.status)
    })
}



export default api
