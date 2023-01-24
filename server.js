require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/router');
const employeeRouter = require('./routes/employee');
require('./db/databaseConnection');
require('./middleware/passport');

app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use('/api/employee', employeeRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});