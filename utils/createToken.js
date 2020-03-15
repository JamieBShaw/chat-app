import jwt from "jsonwebtoken";

const createToken = async (user, expiresIn) => {
	const { id, email, username, role } = user;

	return await jwt.sign(
		{
			id,
			email,
			username,
			role
		},
		process.env.SECRET,
		{
			expiresIn
		}
	);
};

export default createToken;
