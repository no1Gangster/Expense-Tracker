import React, { useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import authentication from "../ApiService/Authentication";
import { useNavigate } from "react-router-dom";

function Signin() {
	const authContext = useAuth();
	const { login } = authContext;

	const mailRef = useRef(null);
	const passRef = useRef(null);

	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			let email = mailRef.current.value;
			let password = passRef.current.value;

			let user = { email, password };
			const res = await authentication.signin(user);

            console.log(res)
			if (res.status) {
				alert("Logged In Successfully");

                login(res.token, res.id)
				navigate("/");
			} else {
				alert(res.message);
			}
		} catch (error) {
			alert("Failed to Sign In");
			console.log("Error" + error.message);
		}
	}

	return (
		<div className="container">
			<div className="card">
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<input
							type="text"
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
							type="submit"
							value="Sign In"
						/>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Signin;
