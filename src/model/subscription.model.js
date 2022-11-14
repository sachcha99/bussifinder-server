const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
    userID: { type: String, required: true, ref: 'user' },
    paymentType: { type: String, required: true },
    paymentID: { type: String, required: true },
    subscriptionPlan: { type: String, required: false },
    subscriptionDate: { type: String, required: false },
    subscriptionEndDate: { type: String, required: false },
    subscriptionStatus: { type: String, required: false },
    subscriptionAmount: { type: Number, required: false },
},{
    timestamps:true
});

const Subscription = mongoose.model('subscription', SubscriptionSchema);
module.exports = Subscription;