import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { IBus, ICreateSchedule } from "../interfaces/interfaces";
import { createSchedule } from "../apis/apiCalls";
import { useFetchBuses } from "../hooks/hooks";

const createScheduleSchema = Yup.object().shape({
    start_point: Yup.string().required("Required"),
    departure_time: Yup.string().required("Required"),
    arrival_time: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
    bus_id: Yup.number().required("Required")
});
const CreateSchedule = () => {
    const { buses }: {buses: IBus[]} = useFetchBuses()
    const initialValues: ICreateSchedule = {
        start_point: "",
        departure_time: "",
        arrival_time: "",
        date: "",
        bus_id: undefined
    };
    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="w-4/5 mx-auto flex-1 flex flex-col items-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Create Schedule</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={createScheduleSchema}
                            onSubmit={(values: ICreateSchedule, { resetForm }) => {
                                createSchedule(values)
                                resetForm()
                            }}
                        >
                            {({ errors, touched, values, handleChange }) => (
                                <Form>
                                    <label className="block mb-2 text-lg font-medium text-gray-900 mt-4">Start point</label>
                                    <Field
                                        type="text"
                                        className="block border border-grey-light w-full p-3 rounded"
                                        name="start_point"
                                        placeholder="Arai"
                                    />
                                    {errors.start_point && touched.start_point ? (
                                        <div>{errors.start_point}</div>
                                    ) : null}
                                    <label className="block mb-2 text-lg font-medium text-gray-900 mt-4">Departure Time</label>
                                    <Field
                                        type="time"
                                        className="block border border-grey-light w-full p-3 rounded "
                                        name="departure_time"
                                        placeholder="Departure time"
                                    />
                                    {errors.departure_time && touched.departure_time ? (
                                        <div>{errors.departure_time}</div>
                                    ) : null}
                                    <label className="block mb-2 text-lg font-medium text-gray-900 mt-4">Arrival Time</label>
                                    <Field
                                        type="time"
                                        className="block border border-grey-light w-full p-3 rounded "
                                        name="arrival_time"
                                        placeholder="Arrival time"
                                    />
                                    {errors.arrival_time && touched.arrival_time ? (
                                        <div>{errors.arrival_time}</div>
                                    ) : null}
                                    <label className="block mb-2 text-lg font-medium text-gray-900 mt-4">Date</label>
                                    <Field
                                        type="date"
                                        className="block border border-grey-light w-full p-3 rounded "
                                        name="date"
                                        placeholder="Date"
                                    />
                                    {errors.date && touched.date ? (
                                        <div>{errors.date}</div>
                                    ) : null}

                                    <label className="block mb-2 text-lg font-medium text-gray-900 mt-4">Bus Id</label>
                                    <Field
                                        as="select"
                                        type="number"
                                        name="bus_id"
                                        className={`bg-transparent block border border-grey-light w-full p-3 rounded mt-4 ${values.bus_id === undefined ? 'text-gray-400' : 'text-black'}`}
                                        onChange={handleChange}
                                    >

                                        <option value={undefined} hidden label="Select a Bus Id" className="text-gray-400">
                                            Select a BusId
                                        </option>
                                        {
                                            buses.map(bus => {
                                                return <option value={bus.id} key={bus.id}>
                                                    {bus.id}
                                                </option>

                                            })

                                        }
                                    </Field>
                                    {errors.bus_id && touched.bus_id ? (<div>{errors.bus_id}</div>) : null}
                                    <button
                                        id="submit"
                                        type="submit"
                                        className="sign-up-btn w-full mt-4 text-center py-3 rounded text-white hover:bg-green-dark focus:outline-none my-1"
                                    >
                                        Create Schedule
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateSchedule;
