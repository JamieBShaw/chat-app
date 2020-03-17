const room = (sequelize, DataTypes) => {
  const Room = sequelize.define('room', {
    name: {
      type: DataTypes.STRING
    }
  });

  Room.associate = models => {
    Room.belongsTo(models.User);
  };

  return Room;
};

export default room;
