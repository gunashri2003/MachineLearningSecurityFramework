import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { Route, Routes as ParentRoutes, Outlet, useNavigate } from "react-router-dom";
import React from "react";
import { UserRole } from "../repository/interfaces";
import ErrorPage from "../error-page";
import Admin from "../components/Admin/Admin";

import User from "../components/User/User";
import PrivateRoute from "../middlewares/private-route";
import { setLoginStatus } from "../store/actions/action";
import Navigation from "../components/Navigation/Navigation";
import Hacker from "../components/Hacker/Hacker";
import Scanner from "../components/Scanner/Scanner";
import Home from "../components/Home/Home";

const Routes = () => {
    const { isUserLoggedIn, userDetails } = useSelector(
      (state: RootState) => state.generalReducer
    );
    const dispatch = useDispatch();
    const user = localStorage.getItem("LOGGEDIN_USER");
    if (user && !isUserLoggedIn) {
      dispatch(setLoginStatus({ status: true }));
    }
  
    const navigate = useNavigate();
  
   
  
  
    return (
       <>
      
     
       
    
  
       <ParentRoutes>
       
         
        
           
           <Route path="/*" element={<> <Home /> 
                
                <Outlet /> {/* Renders child routes */}
           </>} />
           <Route path="/navigation" element={ <Navigation />} />
           <Route path="/admin" element={ <Admin />} /> 
           <Route path="/user" element={ <User />} /> 
           <Route path="/hacker" element={ <Hacker  />} />
         
          
                
               
              
           
  
        {/* <Route path="/all-products" element={<AllProducts />} />
           <Route path="/product/:productid" element={<ProductDetails />} />   */}
          <Route path="*/*" element={<ErrorPage />} />
      {userDetails.role === UserRole.Admin && (
      <Route
        path="/admin" 
          element=
       {
          <>
          
            <Route
              index
              element={
                <PrivateRoute>
                  
                </PrivateRoute>
              }
             /> 
          </>
        }
      />
    )}
        
       </ParentRoutes>
     
       </>
    );
  };
  
  export default Routes;
  