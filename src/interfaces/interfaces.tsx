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
