import { toast } from "react-toastify"
import { userDetails, userLoginBody, userSignUpBody } from "../interfaces/interfaces"

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

export const employeeLogin = (user: userLoginBody, navigate: any, handleSetToken: (bearerToken: string)=>void, handleSetUser: (user: userDetails)=> void) => {
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
            handleSetToken(respJson.token)
            handleSetUser(respJson.user)
            navigate("/schedule")
        }else if (res.status === 404) {
            toast.error("Invalid Email")
        }else {
            toast.error(respJson.error)
        }
    }).catch(err => console.log("err: ", err))
}
