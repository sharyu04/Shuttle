const Schedule = () => {
    return (
        <div className="flex flex-col text-lg block p-6 bg-white border border-gray-200 rounded-lg shadow w-2/3 m-auto">
            <p>Bus Id: <span className="font-semibold">34</span></p>
            <div className="flex items-center">
                <div className="m-4">
                    <p>from</p>
                    <h5 className="font-semibold">startpoint</h5>
                    <p>short address</p>
                    <p>time</p>
                </div>
                <svg className="h-8 w-8 text-gray-900 m-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="m-4">
                    <p>from</p>
                    <h5 className="font-semibold">startpoint startpoint startpoint</h5>
                    <p>short adress</p>
                    <p>time</p>
                </div>
            </div>
            <button className="w-fit self-end bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Reserve
            </button>
        </div>
    )
}
export default Schedule
