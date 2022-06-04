"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("allcodes", "key", "keyMap", {
      type: Sequelize.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("allcodes", "key", "keyMap", {
      type: Sequelize.STRING,
    });
  },
};
