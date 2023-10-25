
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

const useCart = () => {
  const { loading } = useContext(AuthContext);
  const { refetch, data: carts = [] } = useQuery({
    queryKey: ['class'],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_lOCAL_Server}/class`);
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  return [carts, refetch];
};

export default useCart;
