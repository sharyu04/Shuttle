import { Field, Formik, Form } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import * as Yup from "yup"
import YupPassword from "yup-password"
import { postUser } from "../../apis/apiCalls"
import { userSignUpBody } from "../../interfaces/interfaces"
import 'react-toastify/dist/ReactToastify.css';
import "./SignUp.css"

YupPassword(Yup)
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const signUpSchema = Yup.object().shape({
    first_name: Yup.string().min(2, "Too short!").max(50, "Too long").required("Required"),
    last_name: Yup.string().min(2, "Too short!").max(50, "Too long").required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    phone_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10,"Phone number must have 10 digits").max(10,"Phone number must have 10 digits"),
    password: Yup.string().min(6, "Password should have minimum 6 characters").minLowercase(1, "Password must contain atleast 1 lowercase letter").minUppercase(1, "Password must contain atleast 1 uppercase letter").minNumbers(1, "Password must contain atleast 1 number").minSymbols(1, "Password must contain atleast 1 special character").required("Password is required"),
    company_id: Yup.number().required("Enter a company id").min(1, "Invalid company id").max(5, "Invalid company id")
});
const SignUp = () => {

    const navigate = useNavigate()
    const initialValues: userSignUpBody = {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
        company_id: undefined
    }
    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={signUpSchema}
                            onSubmit={(values: userSignUpBody) => {
                                console.log(values)
                                postUser(values, navigate)

                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mt-4"
                                        name="first_name"
                                        placeholder="First Name" />
                                    {errors.first_name && touched.first_name ? (<div>{errors.first_name}</div>) : null}
                                    <Field
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mt-4"
                                        name="last_name"
                                        placeholder="Last Name" />
                                    {errors.last_name && touched.last_name ? (<div>{errors.last_name}</div>) : null}
                                    <Field
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mt-4"
                                        name="email"
                                        placeholder="Email" />
                                    {errors.email && touched.email ? (<div>{errors.email}</div>) : null}
                                    <Field
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mt-4"
                                        name="phone_number"
                                        placeholder="Phone Number" />
                                    {errors.phone_number && touched.phone_number ? (<div>{errors.phone_number}</div>) : null}
                                    {
                                        //     <Field
                                        //     as="select"
                                        //     type="number"
                                        //     name="company"
                                        //     className="bg-transparent block border border-grey-light w-full p-3 rounded mt-4 text-gray-400"
                                        //     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{parseInt(e.target.value, 10)}}
                                        // >
                                        //     <option value={0} hidden label="Select a company">
                                        //         Select a company
                                        //     </option>
                                        //     <option value={company.JoshSoftware}>
                                        //        Josh Software 
                                        //     </option>
                                        //     <option value={company.Tcs}>
                                        //         Tcs
                                        //     </option>
                                        //     <option value={company.Infosys}>
                                        //         Infosys
                                        //     </option>
                                        //     <option value={company.Barclays}>
                                        //         Barclays
                                        //     </option>
                                        //     <option value={company.Atos}>
                                        //         Atos
                                        //     </option>
                                        // </Field>
                                    }
                                    <Field
                                        type="number"
                                        className="block border border-grey-light w-full p-3 rounded mt-4"
                                        name="company_id"
                                        placeholder="Enter Company Id"
                                    ></Field>
                                    {errors.company_id && touched.company_id ? (<div>{errors.company_id}</div>) : null}
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
            <ToastContainer />
        </>
    )
}
export default SignUp


