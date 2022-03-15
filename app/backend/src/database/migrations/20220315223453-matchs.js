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
        type: Sequelize.STRING
      },
      homeTeamGoals: {
        type: Sequelize.STRING
      },
      awayTeam: {
        type: Sequelize.STRING
      },
      awayTeamGoals: {
        type: Sequelize.STRING
      },
      inProgress: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matchs');
  }
};
