import React, { useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import authentication from "../ApiService/Authentication";
import { Link, useNavigate } from "react-router-dom";

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
		<div className="row bg-text-dark g-0 p-3 sign-page">
			<div className="col-md-8 d-flex flex-column text-light mt-md-5 p-md-5">
				<p className="fs-1 fw-bold">Start Your Financial Journey</p>
				<p>Sign Up for Our Expense Tracker</p>
				<p className="d-vary-img">Ready to take control of your finances? Sign up now to start tracking your expenses effortlessly!</p>
			</div>
			<div className="col-md-4 card bg-transparent d-flex align-items-center" style={{ border: "none"}}>
				<div className="card-body dark-box mt-md-5 p-4 d-flex flex-column flex-grow-0">
				<h1 className="text-light my-2 mb-4 mx-auto">Create new account</h1>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Enter Name"
							className="form-control bg-dark dark-input"
							ref={nameRef}
						/>
						<br />
						<input
							type="tel"
							placeholder="Enter Mobile"
							className="form-control bg-dark dark-input"
							ref={mobRef}
						/>
						<br />
						<input
							type="email"
							placeholder="Email"
							className="form-control bg-dark dark-input"
							ref={mailRef}
						/>
						<br />
						<input
							type="password"
							placeholder="Password"
							className="form-control bg-dark dark-input"
							ref={passRef}
						/>
						<br />
						<input
							type="password"
							placeholder="Confirm Password"
							className="form-control bg-dark dark-input"
							ref={cPassRef}
						/>
						<br />
						<input
							type="submit"
							className="btn"
							style={{backgroundColor:"var(--neon-blue)"}}
							value="Sign Up"
						/>
					</form>
					<Link to="/signin"className="mx-auto" style={{color:"var(--base-green)",fontSize:"13px"}}>Already have an account?</Link>
				</div>
				<div className="text-white mx-auto mt-2">
					<p
						className=""
						style={{ fontSize: "10px" }}
					>
						By Click on "Sign Up" you agree to <br />
						<Link className="text-white">
							Terms of Service
						</Link> |{" "}
						<Link className="text-white">Privacy Policy</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
