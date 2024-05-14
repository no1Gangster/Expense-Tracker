import React, { useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import authentication from "../ApiService/Authentication";
import { useNavigate } from "react-router-dom";

function Signup() {
	const authContext = useAuth();
	const { isLoggedIn } = authContext;

	const navigate = useNavigate();

	const mailRef = useRef(null);
	const passRef = useRef(null);
	const nameRef = useRef(null);
	const mobRef = useRef(null);
	const cPassRef = useRef(null);

	function handleSubmit(e) {
		e.preventDefault();

		if (passRef.current.value === cPassRef.current.value) createAccount();
		else console.log(passRef.current.value, cPassRef.current.value);
	}

	async function createAccount() {
		let user = {
			name: nameRef.current.value,
			email: mailRef.current.value,
			mobile: mobRef.current.value,
			password: passRef.current.value,
		};

		try {
			let res = await authentication.signup(user);
			if (res.status) {
				alert("Account created successfully");
				navigate("/signin");
			} else alert("Failed to create account");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="container">
			<div className="card">
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Enter Name"
							ref={nameRef}
						/>
						<br />
						<input
							type="tel"
							placeholder="Enter Mobile"
							ref={mobRef}
						/>
						<br />
						<input
							type="email"
							placeholder="Email"
							ref={mailRef}
						/>
						<br />
						<input
							type="password"
							placeholder="Password"
							ref={passRef}
						/>
						<br />
						<input
							type="password"
							placeholder="Confirm Password"
							ref={cPassRef}
						/>
						<br />
						<input
							type="submit"
							value="Sign Up"
						/>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Signup;
