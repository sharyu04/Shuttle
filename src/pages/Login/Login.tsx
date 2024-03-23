import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom"
import * as Yup from "yup"
import "./Login.css"

interface loginValues {
    email: string;
    password: string;
}
const Login = () => {
    const initialValues: loginValues = {
        email: "",
        password: ""
    }

    const loginSchema = Yup.object().shape({
        email: Yup.string().email("Invalid Email!").required("Required!"),
        password: Yup.string().required("Required!")
    })

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Log in to your account
                            </h1>



                            <Formik
                                initialValues={initialValues}
                                validationSchema={loginSchema}
                                onSubmit={(values) => {
                                    console.log(values)
                                }}
                            >
                            {({errors,touched}) => (
                                <Form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} />
                                        
                                {errors.email && touched.email ? (<div>{errors.email}</div>) : null}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <Field type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
                                    </div>
                                    <button type="submit" id="submit" className="sign-up-btn w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                    </p>
                                </Form>
                                )}
                            </Formik>



                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Login
