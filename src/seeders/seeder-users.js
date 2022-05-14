'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
     * SEE ON DOCUMENT: ->>>> https://sequelize.org/docs/v6/other-topics/migrations/
    */
    return queryInterface.bulkInsert('users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'Mr.',
      lastName: 'Admin',
      address: 'Galaxy',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};

/**
 * up khi chay binh thuong, them du lieu vao
 * down: khi cancel them du lieu rollback
 * 
 */