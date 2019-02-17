'use strict';
module.exports = (sequelize, DataTypes) => {
  const WordItem = sequelize.define('WordItem', {
    word: DataTypes.STRING,
    definition: DataTypes.STRING
  }, {});
  WordItem.associate = function(models) {
    // associations can be defined here
  };
  return WordItem;
};
