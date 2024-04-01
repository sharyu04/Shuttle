import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { ICreateBus } from "../interfaces/interfaces";
import { createBus } from "../apis/apiCalls";

const createBusSchema = Yup.object().shape({
    number: Yup.string().required("Required"),
    capacity: Yup.number().required("Required").min(10, "Minimum bus capacity is 10").max(100, "Bus capacity cannot exceed 100"),
    model: Yup.string().required("Required"),
    company_id: Yup.number().required("Required"),
});
const CreateBus = () => {
    const initialValues: ICreateBus = {
        number: "",
        capacity: undefined,
        model: "",
        company_id: undefined,
    };
    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Create Bus</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={createBusSchema}
                            onSubmit={(values: ICreateBus, { resetForm }) => {
                                console.log(values);
                                createBus(values)
                                resetForm()
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mt-4"
                                        name="number"
                                        placeholder="Bus Number"
                                    />
                                    {errors.number && touched.number ? (
                                        <div>{errors.number}</div>
                                    ) : null}
                                    <Field
                                        type="number"
                                        className="block border border-grey-light w-full p-3 rounded mt-4"
                                        name="capacity"
                                        placeholder="Bus capacity"
                                    />
                                    {errors.capacity && touched.capacity ? (
                                        <div>{errors.capacity}</div>
                                    ) : null}
                                    <Field
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded mt-4"
                                        name="model"
                                        placeholder="Model type"
                                    />
                                    {errors.model && touched.model ? (
                                        <div>{errors.model}</div>
                                    ) : null}
                                    <Field
                                        type="number"
                                        className="block border border-grey-light w-full p-3 rounded mt-4"
                                        name="company_id"
                                        placeholder="Company Id"
                                    />
                                    {errors.company_id && touched.company_id ? (
                                        <div>{errors.company_id}</div>
                                    ) : null}
                                    <button
                                        id="submit"
                                        type="submit"
                                        className="sign-up-btn w-full mt-4 text-center py-3 rounded text-white hover:bg-green-dark focus:outline-none my-1"
                                    >
                                        Create Bus
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default CreateBus;
