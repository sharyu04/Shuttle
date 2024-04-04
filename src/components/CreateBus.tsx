import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { company, ICreateBus } from "../interfaces/interfaces";
import { createBus } from "../apis/apiCalls";
import { useFetchCompanies } from "../hooks/hooks";

const createBusSchema = Yup.object().shape({
    number: Yup.string().required("Required"),
    capacity: Yup.number().typeError('Capacity must be a number').required("Required").min(10, "Minimum bus capacity is 10").max(100, "Bus capacity cannot exceed 100"),
    model: Yup.string().required("Required"),
    company_id: Yup.number().required("Required"),
});
const CreateBus = () => {
    const { companies }: { companies: company[] } = useFetchCompanies()
    const initialValues: ICreateBus = {
        number: "",
        capacity: NaN,
        model: "",
        company_id: undefined,
    };
    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="w-4/5 mx-auto flex-1 flex flex-col items-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Create Bus</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={createBusSchema}
                            onSubmit={(values: ICreateBus, { resetForm }) => {
                                createBus(values)
                                resetForm()
                            }}
                        >
                            {({ errors, touched, values, handleChange }) => (
                                <>
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
                                            as="select"
                                            type="number"
                                            name="company_id"
                                            className={`bg-transparent block border border-grey-light w-full p-3 rounded mt-4 ${values.company_id === undefined ? 'text-gray-400' : 'text-black'}`}
                                            onChange={handleChange}
                                        >

                                            <option value={undefined} hidden label="Select a company" className="text-gray-400">
                                                Select a company
                                            </option>
                                            {
                                                companies.map(comp => {
                                                    return <option value={comp.id} key={comp.id}>
                                                        {comp.name}
                                                    </option>

                                                })

                                            }
                                        </Field>
                                        <button
                                            id="submit"
                                            type="submit"
                                            className="sign-up-btn w-full mt-4 text-center py-3 rounded text-white hover:bg-green-dark focus:outline-none my-1"
                                        >
                                            Create Bus
                                        </button>
                                    </Form>
                                </>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateBus;
