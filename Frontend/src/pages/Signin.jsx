import React, { useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import authentication from "../ApiService/Authentication";
import { Link, useNavigate } from "react-router-dom";

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

			console.log(res);
			if (res.status) {
				alert("Logged In Successfully");

				login(res.token, res.id);
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
		<div className="row bg-text-dark g-0 p-3 sign-page">
			<div className="col-md-8 d-flex flex-column text-light mt-md-5 p-md-5">
				<p className="fs-1 fw-bold">
					Welcome <br />
					Back
				</p>
				<p>Continue tracking expenses</p>
				<p>
					To your financial hub! Log in to manage your expenses with
					ease.
				</p>
			</div>

			<div
				className="col-md-4 card bg-dark d-flex align-items-center bg-transparent"
				style={{ border: "none" }}
			>
				<div
					className="card-body dark-box p-4 d-flex flex-grow-0 flex-column glass-morph"
					style={{ marginTop: "10svh" }}
				>
					<h1 className="text-light my-2 mb-4 mx-auto">Sign In</h1>
					<form onSubmit={handleSubmit}>
						<input
							type="email"
							placeholder="Email"
							className="form-control bg-dark dark-input mt-5"
							ref={mailRef}
							required
						/>
						<br />
						<input
							type="password"
							placeholder="Password"
							minLength={6}
							className="form-control bg-dark dark-input"
							ref={passRef}
							required
						/>
						<br />
						<input
							type="submit"
							value="Sign In"
							className="btn mb-3 mx-auto"
							style={{ backgroundColor: "var(--neon-green)" }}
						/>
					</form>
					<Link
						to="/signup"
						className="mx-auto"
						style={{ color: "var(--base-blue)", fontSize: "13px" }}
					>
						New User?
					</Link>
					<br />
					<p
						className="align-self-center text-white"
						style={{ fontSize: "10px" }}
					>
						By Click on "Sign In" you agree to <br />
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

export default Signin;
