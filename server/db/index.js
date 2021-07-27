
const config = require('../config/dev')
const mongoose = require('mongoose');
require('./models/portfolio');

exports.connect = () => {
    // console.log("URI:",config.DB_URI);
    return mongoose.connect(config.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }, (err) => {
        if (err){
                console.log(err)
        }
        else {
                console.log("Connected to DB");
        }
    })
}
