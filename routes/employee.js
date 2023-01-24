const employeeRouter = require('express').Router();
const controller = require('../controller');


employeeRouter.get('/', controller.employee.listOfEmployee);
employeeRouter.get('/search', controller.employee.search);


module.exports = employeeRouter;