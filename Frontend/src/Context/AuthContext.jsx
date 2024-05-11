//Will have id, isLogged;

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState(null);
	const [id, setId] = useState(null);

	useEffect(() => {
		const jtoken = localStorage.getItem("token");
		const jid = localStorage.getItem("id");
		if (jtoken) {
			login(jtoken, jid);
		}
	}, []);

	const login = (token, id) => {
		console.log(token);
		setIsLoggedIn(true);
		setToken(token);
		setId(id);
		localStorage.setItem("token", token);
		localStorage.setItem("id", id);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("id");
		setIsLoggedIn(false);
		setToken(null);
		setId(null);
	};

	return (
		<AuthContext.Provider value={{ token, id, isLoggedIn, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	return authContext;
};
