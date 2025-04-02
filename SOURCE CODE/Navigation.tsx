import React from "react";
import { useEffect } from "react";
import { UserDetails } from '../../repository/interfaces'
import { UserRole } from '../../repository/interfaces'
import { toastError } from "../../utils/toastMessages";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { useApiCall } from "../../hooks/hooks";
//import UserDetails from "../UserDetails/UserDetails";

const Navigation = () => {

    console.log("Navigatio component rendered!!!")
    const navigate = useNavigate();
    const { getUserDetails } = useApiCall();

    const { isUserLoggedIn } = useSelector(
        (state: RootState) => state.generalReducer
      );


    useEffect(()=>{

        const handleLogin = async () => {
            try {

                const userDetails = await getUserDetails();

                if (userDetails) {

                    if (userDetails.role == UserRole.Admin) {
                        console.log("Who Logged In "+userDetails.role+" "+userDetails.name)
                        navigate("/admin");
                    }
                    else if (userDetails.role == UserRole.User) {
                        console.log("Who Logged In "+userDetails.role)
                        navigate("/user");
                    }
                    else if (userDetails.role == UserRole.Hacker) {
                        console.log("Who Logged In "+userDetails.role)
                        navigate("/hacker");
                    }
                    else{
                        toastError("UnAuthorized USER / User is Not Registered");
                        console.error("User details are undefined or null or UnAuthorized.");
                    }
                }    

            }catch (error) {
                console.error("Error retrieving user details:", error);
              }
            };

            if (!isUserLoggedIn) {
                handleLogin();
              }

    },[isUserLoggedIn, getUserDetails, navigate])


    return (
        <></>
    );

}
export default Navigation;