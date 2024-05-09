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
<<<<<<< HEAD
		let cId = String(import.meta.env.VITE_ROLL_NO)
=======
		let cId = String(import.meta.env.VITE_ROLL_NO);
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
		localStorage.setItem("id", cId);
		setIsLoggedIn(true);
		setId(cId);
	};

	const logout = () => {
		localStorage.removeItem("id");
		setIsLoggedIn(false);
	};

	return (
<<<<<<< HEAD
		<AuthContext.Provider
			value={{ id, isLoggedIn, login, logout }}
		>
=======
		<AuthContext.Provider value={{ id, isLoggedIn, login, logout }}>
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	return authContext;
};
