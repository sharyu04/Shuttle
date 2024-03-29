import CreateBus from "../../components/CreateBus";
import CreateCompany from "../../components/CreateCompany";
import CreateSchedule from "../../components/CreateSchedule";
import Navbar from "../../components/Navbar";

const Create = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-baseline mt-0.5">
        <CreateCompany />
        <CreateBus />
        <CreateSchedule />
      </div>
    </>
  );
};

export default Create;
