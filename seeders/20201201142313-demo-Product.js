"use strict";

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
     */
    await queryInterface.bulkInsert("Users", [
      {
        email: "admin@gmail.com",
        password:
          "$2b$10$26mUw.RqTkaBgaDd7bVGMu.Bli2E.dFXl.AKJBeqDCcowJZMiGoVi",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ]);
    await queryInterface.bulkInsert("Profiles", [
      {
        photo: "default",
        isAdmin: true,
        userId: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
