import { Link } from "react-router-dom"
import "./SignUp.css"
const SignUp = () => {
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="First Name" />
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Last Name" />
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="number"
                        placeholder="Phone Number" />
                    <select id="company" className="bg-transparent block border border-grey-light w-full p-3 rounded mb-4 text-gray-400">
                        <option value="" disabled selected hidden>Select Company</option>
                        <option value="Jsoh Software Pvt Ltd">Josh Software Pvt Ltd</option>
                        <option value="Dhruva">Dhruva</option>
                        <option value="Pattern">Pattern</option>
                    </select>
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" />
                    <button
                        type="submit"
                        className="sign-up-btn w-full text-center py-3 rounded text-white hover:bg-green-dark focus:outline-none my-1"
                    >Create Account</button>

                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <Link to="/login" className="no-underline border-b border-blue text-blue" >
                        Log in
                    </Link>.
                </div>
            </div>
        </div>
    )
}
export default SignUp
