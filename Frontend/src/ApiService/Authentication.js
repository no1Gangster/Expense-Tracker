import axios from "axios";

class Authentication {
	constructor() {
		this.api = String(import.meta.env.VITE_BACKEND_API);
	}

	async signup(newUser) {
		try {
			let res = await axios.post(`${this.api}/user/signup`, newUser);
			return {
				status: true,
				message: "Account created successfully",
				res: res.body,
			};
		} catch (error) {
			// console.log(error);
			return {
				status: false,
				message: "Failed to create account",
				error: error.message,
			};
		}
	}

	async signin(user) {
		try {
			let res = await axios.post(`${this.api}/user/signin`, user);

			// console.log(res);
			// console.log(res.data.userdetails._id)
			if (res.data.token) {
                // console.log('true')
				return { status: true, token: res.data.token, id : res.data.userdetails._id };
			} else{
                // console.log('false')
                return { status: false, message: res.message };
                
            } 
		} catch (error) {
			return {
				status: false,
				message: "Failed to sign in",
				error: error.message,
			};
		}
	}
}

const authentication = new Authentication();
export default authentication;
