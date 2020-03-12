import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres'
  }
);

const models = {
  User: sequelize.import('./User'),
  Messages: sequelize.import('./Messages')
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

export { sequelize };

export default models;
