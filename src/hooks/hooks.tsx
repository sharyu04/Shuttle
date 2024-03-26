import { useQuery } from "@tanstack/react-query"

export const useFetchCompanies = () => {
    const { data, error } = useQuery({
        queryKey: ["companies"],
        queryFn: () => fetch("http://localhost:3000/companies").then(res=>res.json),
    })
    
    return {companies: data,error}
}


