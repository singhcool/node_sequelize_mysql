"use strict";
module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          is: {
            args: ["^[a-z]+$", "i"], // will only allow letters
            msg: "Must be a string",
          },
        },
      },
      age: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          is: ["^[a-z]+$", "i"], // will only allow letters
        },
      },
    },
    {
      tableName: "user",
      timestamps: false,
    }
  );
  return user;
};
