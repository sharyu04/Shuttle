import { Field, Formik, Form } from "formik"
import { Link } from "react-router-dom"
import "./SignUp.css"


interface values {
    firstName: string;
    lastName: string;
    email: string;
    phnNo: string;
    company: string;
    password: string;
}
const SignUp = () => {

    const initialValues: values = {
        firstName: "",
        lastName: "",
        email: "",
        phnNo: "",
        company: "default",
        password: ""
    }
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                    >
                        <Form>
                            <Field
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="firstName"
                                placeholder="First Name" />
                            <Field
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="lastName"
                                placeholder="Last Name" />
                            <Field
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email" />
                            <Field
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="phnNo"
                                placeholder="Phone Number" />
                            <Field
                                as="select"
                                name="company"
                                className="bg-transparent block border border-grey-light w-full p-3 rounded mb-4 text-gray-400"
                            >
                                <option value="default" label="Select a company">
                                    Select a company
                                </option>
                                <option value="Josh">
                                    Josh
                                </option>
                                <option value="Pattern">
                                    Pattern
                                </option>
                                <option value="Dhruva">
                                    Dhruva
                                </option>
                            </Field>
                            <Field
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                placeholder="Password" />
                            <button
                                id="submit"
                                type="submit"
                                className="sign-up-btn w-full text-center py-3 rounded text-white hover:bg-green-dark focus:outline-none my-1"
                            >Create Account</button>
                        </Form>
                    </Formik>

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


