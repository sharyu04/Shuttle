import { Field, Form, Formik } from "formik"
import { ICreateCompany } from "../interfaces/interfaces"
import * as Yup from "yup"
import { ToastContainer } from "react-toastify";
import { createCompany } from "../apis/apiCalls";
import 'react-toastify/dist/ReactToastify.css';

const createCompanySchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
});
const CreateCompany = () => {

    const initialValues: ICreateCompany = {
        name: "",
        location: ""
    }
    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Create Company</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={createCompanySchema}
                            onSubmit={(values: ICreateCompany, { resetForm }) => {
                                console.log(values)
                                resetForm();
                                createCompany(values)
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mt-4"
                                        name="name"
                                        placeholder="Company Name" />
                                    {errors.name && touched.name ? (<div>{errors.name}</div>) : null}
                                    <Field
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mt-4"
                                        name="location"
                                        placeholder="Company Location" />
                                    {errors.location && touched.location ? (<div>{errors.location}</div>) : null}
                                    <button
                                        id="submit"
                                        type="submit"
                                        className="sign-up-btn w-full mt-4 text-center py-3 rounded text-white hover:bg-green-dark focus:outline-none my-1"
                                    >Create Company</button>
                                </Form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>

    )
}

export default CreateCompany
