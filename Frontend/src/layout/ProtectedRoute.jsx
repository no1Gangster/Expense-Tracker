import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
	const token = localStorage.getItem("token");
	return token ? <Outlet /> : <Navigate to={"/signin"} replace />
}

export default ProtectedRoute;
