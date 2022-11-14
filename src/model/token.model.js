const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "user", unique: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), expires: 3600 },
});

const Token = mongoose.model('token', TokenSchema);
module.exports = Token;