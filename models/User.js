const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../sequelize');

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true, // Adicionando índice de unicidade
    allowNull: false,
    validate: {
      notEmpty: true, // Validando que o campo não esteja vazio
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Validando que o campo não esteja vazio
    },
  },
});

// Adicionando um hook para hashear a senha antes de salvar o usuário
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;
