import React, { useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import authentication from "../ApiService/Authentication";

function Signin() {
	
    const authContext = useAuth();
    const { isLoggedIn } = authContext;
    
    const mailRef = useRef(null);
	const passRef = useRef(null);



    async function handleSubmit(e) {
        e.preventDefault()
        let mail = mailRef.current.value
        let pass = passRef.current.value

        const res = await authentication.login(mail, pass);

        console.log(res);
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
                        <input type="submit" value="Sign In" />
					</form>
				</div>
			</div>
		</div>
	);
}

export default Signin;
