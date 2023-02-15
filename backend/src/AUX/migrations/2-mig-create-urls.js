'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('urls', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // user_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'users',
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      // },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('urls')
  }
};