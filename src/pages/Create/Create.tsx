import CreateBus from "../../components/CreateBus";
import CreateCompany from "../../components/CreateCompany";
import CreateSchedule from "../../components/CreateSchedule";
import Navbar from "../../components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const Create = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-baseline mt-0.5">
        <CreateCompany />
        <CreateBus />
        <CreateSchedule />
      </div>
      <ToastContainer/>
    </>
  );
};

export default Create;
