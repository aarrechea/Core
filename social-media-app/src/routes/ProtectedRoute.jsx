/* Imports */
import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../hooks/user.actions";



/* Protected route */
function ProtectedRoute({children}) {
    // Retrieving the user property from local storage
    const user = getUser();    

    return user ? <>{children}</> : <Navigate to="/login" />
}

export default ProtectedRoute;





