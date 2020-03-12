const user = (sequelize, DataTypes) => {
	const User = sequelize.define("user", {
		id: {
			type: DataTypes.STRING
		},
		username: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		}
	});

	User.associate = models => {
		User.hasMany(models.Messages, { onDelete: "CASCADE" });
	};
	return User;
};

export default user;
