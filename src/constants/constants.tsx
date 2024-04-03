export const company = {
    JoshSoftware: 1,
    Tcs: 2,
    Infosys: 3,
    Barclays: 4,
    Atos: 5
}

export const urls = {
    userSignup: "http://localhost:3000/users",
    getSchedules: "http://localhost:3000/schedules",
    getReservations: "http://localhost:3000/reservations"
}

export const sortByValues = {
    busId: "bus_id",
    from: "start_point",
    to: "to",
    arrival_time: "arrival_time",
    departure_time: "departure_time",
    available_seats: "available_seats",
    userName: "name",
    id: "id"
}

export const components = {
    createBus: "Bus",
    createCompany: "company",
    createSchedule: "schedule"
}

export const pages = {
    Home: "/",
    Create: "/create",
    MyReservations: "/user_reservations",
    ViewReservations: "/all_reservations",
    ViewBuses: "/buses",
    ViewUsers: "/users"
}
