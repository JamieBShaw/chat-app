const message = (sequelize, DataTypes) => {
	const Message = sequelize.define("message", {
		body: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: {
					args: true,
					msg: "A message must have text."
				}
			}
		},
		roomId: {
			type: DataTypes.STRING
		}
	});

	Message.associate = models => {
		Message.belongsTo(models.User);
	};
	return Message;
};

export default message;
