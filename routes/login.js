const express = require("express");
const router = express.Router();
const loginController = require("../controller/login");

/**
 * @swagger
 * definitions:
 *   Admin:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - Admin
 *     description: Admin Login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: admin
 *         description: Admin object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Admin'
 *     responses:
 *       200:
 *         description: Successfully Login
 */
router.post("/", loginController.loginUser);

module.exports = router;
