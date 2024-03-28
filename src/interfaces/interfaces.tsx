export interface company {
    id: number;
    name: string;
    location: string
}
export interface userSignUpBody {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    company_id: number|undefined;
}
export interface userLoginBody{
    email: string;
    password: string;
}
export interface userDetails{
        email: string;
        first_name: string;
        id: number;
        last_name: string;
        phone_number: string;
        role_id: number
    }
