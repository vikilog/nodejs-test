const mongoose = require('mongoose');
const config = require('config');
mongoose.set('strictQuery', true)

mongoose.connect(config.get('MONGO_URI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const database=mongoose.connection;

database.on('error',console.error.bind('error','connect error'));
database.once('open',()=>{
    console.log("We are connected");
});
