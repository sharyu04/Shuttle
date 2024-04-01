import { number, string } from "yup";

export interface company {
    id: number;
    name: string;
    location: string;
}
export interface ICreateCompany {
    name: string;
    location: string;
}
export interface userSignUpBody {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    company_id: number | undefined;
}
export interface userLoginBody {
    email: string;
    password: string;
}
export interface userDetails {
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    phone_number: string;
    role_id: number;
}
export interface schedule {
    id: number;
    start_point: string;
    arrival_time: string;
    departure_time: string;
    date: string;
    bus_id: number;
    available_seats: number;
    company_id: number;
    company_name: string;
    company_location: string
}
export interface ICreateBus {
    number: string;
    capacity: number | undefined;
    model: string;
    company_id: number | undefined;
}
export interface ICreateSchedule {
    start_point: string;
    departure_time: string;
    arrival_time: string;
    date: string;
    bus_id: number | undefined;
}
export interface ICreateReservation {
    schedule_id: number;
    user_id: number | undefined;
}
export interface IReservationSchedule {
    id: number;
    start_point: string;
    arrival_time: string;
    departure_time: string;
    date: string;
    company_name: string
}
export interface IReservation {
    id: number;
    user_id: number;
    schedule_id: number;
    schedule: IReservationSchedule;
    first_name: string;
    last_name: string
}
