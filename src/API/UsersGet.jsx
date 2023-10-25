import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

 
const UsersGet = () => {
    const { loading } = useContext(AuthContext);
    const { refetch, data: usersAll = [] } = useQuery({
      queryKey: ['usersAll'],
      enabled: !loading,
      queryFn: async () => {
        const res = await fetch(`${import.meta.env.VITE_lOCAL_Server}/users`);
        const data = await res.json();
        console.log(data);
        return data;
      },
    });
  
    return [usersAll, refetch];
};

export default UsersGet;