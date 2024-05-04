//Will have id, isLogged;

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [id, setId] = useState(null);

	useEffect(() => {
		const jwttoken = localStorage.getItem("id");
		if (jwttoken) {
			login(true);
		}
	}, []);

	const login = () => {
		let cId = String(import.meta.env.VITE_ROLL_NO)
		localStorage.setItem("id", cId);
		setIsLoggedIn(true);
		setId(cId);
	};

	const logout = () => {
		localStorage.removeItem("id");
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{ id, isLoggedIn, login, logout }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	return authContext;
};
