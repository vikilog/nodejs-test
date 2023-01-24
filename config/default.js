console.log(process.env.DB_USER);

module.exports={
    MONGO_URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c1bmprv.mongodb.net/employee?retryWrites=true&w=majority`
}