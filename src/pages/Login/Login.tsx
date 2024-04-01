import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import * as Yup from "yup"
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"
import { userLoginBody } from "../../interfaces/interfaces";
import { employeeLogin } from "../../apis/apiCalls";
import React from "react";
import { IContext, MyContext } from "../../MyContext";
// import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
    // const queryClient = useQueryClient()
    const navigate = useNavigate();
    const { handleSetUser } = React.useContext(MyContext) as IContext;
    const initialValues: userLoginBody = {
        email: "",
        password: ""
    }

    const loginSchema = Yup.object().shape({
        email: Yup.string().email("Invalid Email!").required("Required!"),
        password: Yup.string().required("Required!")
    })

    return (
        <div>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Log in to your account
                            </h1>



                            <Formik
                                initialValues={initialValues}
                                validationSchema={loginSchema}
                                onSubmit={(values) => {
                                    employeeLogin(values, navigate, handleSetUser)
                                    // queryClient.refetchQueries({
                                    //     queryKey: ["schedules"]
                                    // })
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                            <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required={true} />

                                            {errors.email && touched.email ? (<div>{errors.email}</div>) : null}
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                            <Field type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true} />
                                            {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
                                        </div>
                                        <button type="submit" id="submit" className="sign-up-btn w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in</button>
                                        <p className="text-sm font-light text-gray-500">
                                            Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline">Sign up</Link>
                                        </p>
                                    </Form>
                                )}
                            </Formik>



                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    )
}
export default Login
