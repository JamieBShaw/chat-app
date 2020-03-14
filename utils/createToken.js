import jwt from "jsonwebtoken";

const createToken = async (user, expiresIn) => {
	const { id, email, username } = user;

	return await jwt.sign(
		{
			id,
			email,
			username
		},
		process.env.SECRET_KEY,
		{
			expiresIn
		}
	);
};

export default createToken;
