const employeeModel=require('../../model/employee');


const listOfEmployee=async (req, res, next) => {
    const employeeData = await employeeModel.find();
    return res.status(200).json({
        message: 'List of employee',
        data: employeeData,
    });
}

module.exports=listOfEmployee;