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
    await queryInterface.bulkInsert("users", [
      {
        email: "admin@gmail.com",
        password: "$2b$10$26mUw.RqTkaBgaDd7bVGMu.Bli2E.dFXl.AKJBeqDCcowJZMiGoVi",
      },
    ]);
    await queryInterface.bulkInsert("profiles", [
      {
        photo: "default",
        isAdmin: true,
        userId: 1,
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
