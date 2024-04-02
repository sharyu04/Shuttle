import CreateBus from "../../components/CreateBus";
import CreateCompany from "../../components/CreateCompany";
import CreateSchedule from "../../components/CreateSchedule";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { components } from "../../constants/constants";

const Create = () => {
    const [activeComponent, setActiveComponent] = useState<string>(components.createCompany)
    return (
        <>
            <Navbar />

            <div>
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button" className={`px-4 py-2 text-sm font-medium ${activeComponent===components.createCompany ? "text-blue-700" : "text-gray-900"} bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700`} onClick={() => { setActiveComponent(components.createCompany) }}>
                        Create Company
                    </button>
                    <button type="button" className={`px-4 py-2 text-sm font-medium ${activeComponent===components.createBus ? "text-blue-700" : "text-gray-900"} bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700`} onClick={() => { setActiveComponent(components.createBus) }}>
                        Create Bus
                    </button>
                    <button type="button" className={`px-4 py-2 text-sm font-medium ${activeComponent===components.createSchedule ? "text-blue-700" : "text-gray-900"} bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700`} onClick={() => { setActiveComponent(components.createSchedule) }}>
                        Create Schedule
                    </button>
                </div>
                <div>
                {activeComponent === components.createCompany ? <CreateCompany/> : (activeComponent === components.createSchedule ? <CreateSchedule/> : <CreateBus/>)}
                </div>
            </div>

        </>
    );
};

export default Create;
