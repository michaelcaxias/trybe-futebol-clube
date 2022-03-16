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
        type: Sequelize.INTEGER,
        references: { model: 'clubs', key: 'id' },
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        references: { model: 'clubs', key: 'id' },
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
