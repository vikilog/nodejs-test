const employeeModel = require('../../model/employee');


const searchEmployee = async (req, res, next) => {
    const query = req.query.query;
    const employeeData = await employeeModel.find({
        $text: {
            $search: query
        }
    })
    return res.status(200).json({
        message: 'List of employee',
        data: employeeData,
    });
}


module.exports = searchEmployee;