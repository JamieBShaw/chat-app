const message = (sequelize, DataTypes) => {
	const Message = sequelize.define("message", {
		username: {
			type: DataTypes.STRING
		},
		body: {
			type: DataTypes.STRING
		}
	});

	Message.associate = models => {
		Message.hasMany(models.Messages, { onDelete: "CASCADE" });
	};
	return Message;
};

export default message;
