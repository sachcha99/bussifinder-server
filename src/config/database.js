const mongoose = require("mongoose");

const URI = "mongodb+srv://admin:admin123@cluster0.qh5xs.mongodb.net/bussifinderDB?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    console.log("Database Connected");
}

module.exports = connectDB;