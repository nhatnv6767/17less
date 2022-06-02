module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        "users",
        "image",
        {
          type: Sequelize.BLOB,
          allowNull: true,
        },
        {
          transaction,
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        "users",
        "image",
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        {
          transaction,
        }
      ),
    ]);
  },
};

// npx sequelize-cli db:migrate
