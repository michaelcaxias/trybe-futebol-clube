'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        type: Sequelize.INTEGER
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER
      },
      awayTeam: {
        type: Sequelize.INTEGER
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER
      },
      inProgress: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matchs');
  }
};
