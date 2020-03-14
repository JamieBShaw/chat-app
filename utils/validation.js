const validateRegistration = (username, email, password, confirmPassword) => {
	let errors = {};

	if (!username || username.trim() === "") {
		errors.username = "Username is required";
	}
	if (!email || email.trim() === "") {
		errors.email = "Email address is required";
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (!email.match(regEx)) {
			errors.email = "Email is not valid";
		}
	}

	if (!password || password < 8) {
		errors.password = "Password must be 8 characters long";
	} else if (confirmPassword !== password) {
		error.confirmPassword = "Paasswords do not match";
	} else if (!confirmPassword) {
		errors.confirmPassword = "Please confirm your password";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1
	};
};

export { validateRegistration, validateLogin };
