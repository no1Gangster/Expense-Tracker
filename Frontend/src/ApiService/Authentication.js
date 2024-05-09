import axios from "axios";

class Authentication {
	constructor() {
		this.api = String(import.meta.env.VITE_BACKEND_API);
	}

	// async function login(mail, pass) {
	//     let res = await
	// }

	async signup(newUser) {
		try {
			let res = await axios.post(`${this.api}/user`, newUser);
			return {
				status: true,
				message: "Account created successfully",
				res: res.body,
			};
		} catch (error) {
			console.log(error);
			return {
				status: false,
				message: "Failed to create account",
				error: error.message,
			};
		}
	}
}

const authentication = new Authentication();
export default authentication;
