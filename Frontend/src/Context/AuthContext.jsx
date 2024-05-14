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

<<<<<<< HEAD
	const login = () => {
<<<<<<< HEAD
		let cId = String(import.meta.env.VITE_ROLL_NO)
=======
		let cId = String(import.meta.env.VITE_ROLL_NO);
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
		localStorage.setItem("id", cId);
=======
	const login = (token, id) => {
		console.log(token);
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
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
<<<<<<< HEAD
<<<<<<< HEAD
		<AuthContext.Provider
			value={{ id, isLoggedIn, login, logout }}
		>
=======
		<AuthContext.Provider value={{ id, isLoggedIn, login, logout }}>
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
		<AuthContext.Provider value={{ token, id, isLoggedIn, login, logout }}>
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	return authContext;
};
