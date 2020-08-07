class Auth {
	constructor() {
		this.auth = false;
	}

	/**
	 * Checking if user is authenticated.
	 *
	 * Returns: true if auth or false if not
	 */
	async isAuth() {
		// Getting token from localstorage
		const token = localStorage.getItem("token");

		// Validating if token exists. If not, return false
		if (token === null || token === undefined) {
			this.auth = false;

			return this.auth;
		}

		try {
			// Checking if JWT valid
			let isValid = await fetch("http://localhost:5000/auth/check", {
				method: "GET",
				headers: {
					"auth-token": token,
					"Content-Type": "application/json",
				},
			});

			if (isValid.status !== 200) {
				this.auth = false;

				return this.auth;
			} else {
				this.auth = true;

				return this.auth;
			}
		} catch (err) {
			this.auth = false;

			return this.auth;
		}
	}

	/**
	 * Removes user auth (deletes JWT)
	 */

	removeAuth() {
		// Deleting JWT from localStorage
		localStorage.removeItem("token");

		return true;
	}
}

export default new Auth();
