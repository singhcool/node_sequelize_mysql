var models = require("../models");

function getAllUsers(req, res, next) {
  models.user
    .findAll()
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL Users",
      });
    })
    .catch((error) => {
      next(error);
    });
}

function getSingleUser(req, res, next) {
  var userId = parseInt(req.params.id);
  models.user
    .findOne({ where: { id: userId } })
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL Users",
      });
    })
    .catch((error) => {
      next(error);
    });
}

function createUser(req, res, next) {
  req.body.age = parseInt(req.body.age);
  models.user
    .create({ name: req.body.name, age: req.body.age, gender: req.body.gender })
    .then(function () {
      res.status(200).json({
        status: "success",
        message: "Inserted one user",
      });
    })
    .catch((error) => {
      next(error);
    });
}

function updateUser(req, res, next) {
  var userId = parseInt(req.params.id);
  models.user
    .update(
      {
        name: req.body.name,
        age: parseInt(req.body.age),
        gender: req.body.gender,
      },
      { where: { id: userId } }
    )
    .then(function () {
      res.status(200).json({
        status: "success",
        message: "Updated user",
      });
    })
    .catch((error) => {
      next(error);
    });
}

function removeUser(req, res, next) {
  var userId = parseInt(req.params.id);
  models.user
    .destroy({ where: { id: userId } })
    .then(function (data) {
      res.status(200).json({
        status: "success",
        message: `Removed user`,
      });
    })
    .catch((error) => {
      next(error);
    });
}

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser,
};
