import { toast } from "react-toastify"
import { userSignUpBody } from "../interfaces/interfaces"

export const postUser = (user: userSignUpBody) => {
    const response = fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user })
    })
    response.then(async (res) => {
        const respJson = await res.json()
        res.status !== 201 ? (
            respJson.map((resText: string) => toast.error(resText))
        ) :
            console.log(respJson)
    })
        .catch(err => {
            console.log("postUser err: ", err)
        }
        )
}
