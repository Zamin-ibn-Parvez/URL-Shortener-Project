const mongoose = require("mongoose");

async function connectToMOngoDB (url){

    return mongoose.connect(url);
}

module.exports = {connectToMOngoDB};