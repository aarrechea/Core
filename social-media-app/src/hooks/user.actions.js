/* Imports */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";



/* User actions */
function useUserActions() {
    const navigate = useNavigate();
    const baseURL = "http://localhost:8000/api";
    

    return {
        login,
        register,
        logout,
        edit
    };


    /* Register function */
    function register(data) {
        return axios
            .post(`${baseURL}/auth/register/`, data)
            
            .then((res) => {            
                setUserData(res.data);
                navigate("/");
            });
    }


    /* Login function */
    function login(data) {
        return axios
            .post(`${baseURL}/auth/login/`, data)
            
            .then((res) => {
                setUserData(res.data);
                navigate("/");
            })            
    }


    /* Logout function */
    function logout() {
        localStorage.removeItem("auth");
        navigate("/login");
    }


    /* Edit user profile */
    function edit(data, userId) {
        return axiosService
            .patch(`${baseURL}/user/${userId}/`, data)

            .then((res) => {
                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        access: getAccessToken(),
                        refresh: getRefreshToken(),
                        user: res.data
                    })
                );
            });
    }
}



/* Get user */
function getUser() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.user;        
}



/* Get access token */
function getAccessToken() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.access;
}



/* Get refresh token */
function getRefreshToken() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.refresh;
}



/* Set the access, token and user property */
function setUserData(data) {
    localStorage.setItem(
        "auth",
        JSON.stringify({
            access: data.access,
            refresh: data.refresh,
            user: data.user,
        })
    );
}



/* Exports */
export {
    useUserActions,
    getUser,
    getAccessToken,
    getRefreshToken,
    setUserData
}




