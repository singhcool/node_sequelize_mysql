"use strict";
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    "admin",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: "admin",
    },
    {
      defaultScope: {
        attributes: { exclude: ['password'] }
     }
    }
  );
  admin.associate = function (models) {
    // associations can be defined here
  };
  return admin;
};
