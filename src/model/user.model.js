const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    isVerified: { type: Boolean, required: false },
    googleUser: { type: Boolean, required: false },
    emailToken: { type: String, required: false },
    password: { type: String, required: true },
    predictionCount: { type: Number, required: false },
    compareCount: { type: Number, required: false },
    locationPredictCount: { type: Number, required: false },
    paymentType: { type: String, required: true },
    paymentID: { type: String, required: true },
    subscriptionPlan: { type: String, required: false },
    subscriptionType: { type: String, required: false },
    subscriptionDate: { type: String, required: false },
    subscriptionEndDate: { type: String, required: false },
    subscriptionStatus: { type: String, required: false },

},{
    timestamps:true
});

const User = mongoose.model('user', UserSchema);
module.exports = User;