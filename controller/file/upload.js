const xlsx = require('xlsx');
const employee = require('../../model/employee');

const uploadFile=async (req, res, next) => {
    if(req.file){
        if(req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
            const workbook = xlsx.readFile(req.file.path);
            const sheet_name_list = workbook.SheetNames;
            const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

            // lowercase all keys
            for (let i = 0; i < data.length; i++) {
                let keys = Object.keys(data[i]);
                let n = keys.length;
                let newobj = {};
                while (n--) {
                    newobj[keys[n].toLowerCase()] = data[i][keys[n]];
                }
                data[i] = newobj;
            }

            req.data = data;


            return next();
        }
    }
    else {
        return res.status(400).json({
            message: 'No file uploaded',
        });
    }
}

const insertDataToDatabase=async (req, res, next) => {

    if(req.data){
        for (let i = 0; i < req.data.length; i++) {
            let employeeData = new employee(req.data[i]);
            await employeeData.save();
        }
        return res.status(200).json({
            message: 'Data inserted successfully',
        });
    }
    else {
        return res.status(400).json({
            message: 'No data to insert',
        });
    }
}

module.exports = [
    uploadFile,
    insertDataToDatabase,
]