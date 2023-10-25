 
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from '../AuthProvider/AuthProvider';

const UseAdmin = () => {
    const {user, loading} = useContext(AuthContext) ;
    const [axiosSecure] = useAxiosSecure();
    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled:!loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/newUser/${user?.email}`);
            // console.log('is admin response', res)
            return res.data.admin;
        }
    })
    return [isAdmin,isAdminLoading]
};
export default UseAdmin;