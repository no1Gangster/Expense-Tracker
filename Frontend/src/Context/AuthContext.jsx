//Will have id, isLogged;

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [id, setId] = useState(null);
	const [ email, setEmail ] = useState(null);

	useEffect(() => {
		const jwttoken = localStorage.getItem("id");
		if (jwttoken) {
			login(true);
		}
	}, []);

	const login = (email) => {
		let cId = email;
		localStorage.setItem("email", cId);
		setIsLoggedIn(true);
		setEmail(email);
		setId(cId);
	};

	const logout = () => {
		localStorage.removeItem("id");
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ id, isLoggedIn, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	return authContext;
};
