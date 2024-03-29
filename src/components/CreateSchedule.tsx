import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import { ICreateSchedule } from "../interfaces/interfaces";

const createScheduleSchema = Yup.object().shape({
    start_point: Yup.string().required("Required"),
    departure_time: Yup.string().required("Required"),
    arrival_time: Yup.string().required("Required"),
    date: Yup.number().required("Required"),
    bus_id: Yup.number().required("Required")
});
const CreateSchedule = () => {
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
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Create Schedule</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={createScheduleSchema}
              onSubmit={(values: ICreateSchedule) => {
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mt-4"
                    name="start_point"
                    placeholder="Start point"
                  />
                  {errors.start_point && touched.start_point ? (
                    <div>{errors.start_point}</div>
                  ) : null}
                  <Field
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mt-4"
                    name="departure_time"
                    placeholder="Departure time"
                  />
                  {errors.departure_time && touched.departure_time ? (
                    <div>{errors.departure_time}</div>
                  ) : null}
                  <Field
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mt-4"
                    name="arrival_time"
                    placeholder="Arrival time"
                  />
                  {errors.arrival_time && touched.arrival_time? (
                    <div>{errors.arrival_time}</div>
                  ) : null}
                  <Field
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mt-4"
                    name="date"
                    placeholder="Date"
                  />
                  {errors.date && touched.date ? (
                    <div>{errors.date}</div>
                  ) : null}
                  <Field
                    type="number"
                    className="block border border-grey-light w-full p-3 rounded mt-4"
                    name="bus_id"
                    placeholder="Bus Id"
                  />
                  {errors.bus_id && touched.bus_id ? (
                    <div>{errors.bus_id}</div>
                  ) : null}
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
      <ToastContainer />
    </>
  );
};

export default CreateSchedule;
