import { Field, Formik, Form } from "formik"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import YupPassword from "yup-password"
import "./SignUp.css"

YupPassword(Yup)
interface values {
    firstName: string;
    lastName: string;
    email: string;
    phnNo: string;
    company: string;
    password: string;
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const signUpSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too short!").max(50, "Too long").required("Required"),
    lastName: Yup.string().min(2, "Too short!").max(50, "Too long").required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    phnNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    password: Yup.string().min(6, "Password should have minimum 6 characters").minLowercase(1, "Password must contain atleast 1 lowercase letter").minUppercase(1, "Password must contain atleast 1 uppercase letter").minNumbers(1, "Password must contain atleast 1 number").minSymbols(1, "Password must contain atleast 1 special character").required("Password is required"),
    company: Yup.string().required("Select a company")
});
const SignUp = () => {

    const initialValues: values = {
        firstName: "",
        lastName: "",
        email: "",
        phnNo: "",
        company: "",
        password: ""
    }
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={signUpSchema}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mt-4"
                                    name="firstName"
                                    placeholder="First Name" />
                                {errors.firstName && touched.firstName ? (<div>{errors.firstName}</div>) : null}
                                <Field
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mt-4"
                                    name="lastName"
                                    placeholder="Last Name" />
                                {errors.lastName && touched.lastName ? (<div>{errors.lastName}</div>) : null}
                                <Field
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mt-4"
                                    name="email"
                                    placeholder="Email" />
                                {errors.email && touched.email ? (<div>{errors.email}</div>) : null}
                                <Field
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mt-4"
                                    name="phnNo"
                                    placeholder="Phone Number" />
                                {errors.phnNo && touched.phnNo ? (<div>{errors.phnNo}</div>) : null}
                                <Field
                                    as="select"
                                    name="company"
                                    className="bg-transparent block border border-grey-light w-full p-3 rounded mt-4 text-gray-400"
                                >
                                    <option value="" hidden label="Select a company">
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
                                {errors.company && touched.company ? (<div>{errors.company}</div>) : null}
                                <Field
                                    type="password"
                                    className="block border border-grey-light w-full p-3 rounded mt-4"
                                    name="password"
                                    placeholder="Password" />
                                {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
                                <button
                                    id="submit"
                                    type="submit"
                                    className="sign-up-btn w-full mt-4 text-center py-3 rounded text-white hover:bg-green-dark focus:outline-none my-1"
                                >Create Account</button>
                            </Form>
                        )}
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


