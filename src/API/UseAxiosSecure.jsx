import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const axiosSecure = axios.create({
    baseURL:` ${ import.meta.env.VITE_lOCAL_Server }`,
});
const UseAxiosSecure = () => {
    const { logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem("access-token");
            console.log(token);
            if (token) {
                config.headers.Authorization = `Bearer ${ token }`;
            }
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (
                    error.response &&
                    (error.response.status === 401 || error.response.status === 403)
                ) {
                    await logOutUser();
                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );
    }, [logOutUser, navigate, axiosSecure]);

    return [axiosSecure];
};

export default UseAxiosSecure;