import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Navbar() {
	const authContext = useAuth();
	const { id, isLoggedIn, login, logout } = authContext;
	function handleLogin(e) {
		login();
		console.log({ id, isLoggedIn });
	}
	function handleLogout(e) {
		logout();
		console.log({ id, isLoggedIn });
	}
	return (
		<div style={{ marginBottom: "75px" }}>
			<nav
				className="navbar navbar-expand-lg navbar-expand-md bg-body-tertiary fixed-top"
				data-bs-theme="dark"
			>
				<div className="container-fluid text-bg-grey position-relative">
					<Link
						className="navbar-brand"
						to="/"
					>
						<img
							src="/logo.svg"
							alt=""
						/>
					</Link>
					<button
						className="navbar-toggler order-2"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasNavbar"
						aria-controls="offcanvasNavbar"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="offcanvas offcanvas-end"
						tabIndex="-1"
						id="offcanvasNavbar"
						aria-labelledby="offcanvasNavbarLabel"
					>
						<div className="offcanvas-header">
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="offcanvas"
								aria-label="Close"
							></button>
						</div>
						<div className="offcanvas-body">
							<ul className="navbar-nav justify-content-center flex-grow-1 d-flex pe-5 ">
								<li className="nav-item navbar-items me-2">
									<Link
										className="nav-link"
										aria-current="page"
										to="/"
									>
										Home
									</Link>
								</li>
								<li className="nav-item navbar-items me-2">
									<Link
										className="nav-link "
										aria-current="page"
										to="/stats"
									>
										Stats
									</Link>
								</li>
								<li className="nav-item navbar-items">
									<Link
										className="nav-link"
										to="/about"
									>
										About Us
									</Link>
								</li>
							</ul>
						</div>
					</div>
					{!isLoggedIn ? (
						<button
							className="btn btn-neon ms-auto me-2"
							onClick={handleLogin}
						>
							Log In
						</button>
					) : (
						<button
							className="btn btn-neon ms-auto me-2"
							onClick={handleLogout}
						>
							Log Out
						</button>
					)}
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
