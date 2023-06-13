const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const verify_roles = require('../../middleware/verify_roles')


router.route('/')
    .get(verify_roles(2000), employeesController.getAllEmployees)
    .post(verify_roles(3000, 1000), employeesController.createNewEmployee)
    .put(verify_roles(3000, 1000),employeesController.updateEmployee)
    .delete(verify_roles(1000),employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;