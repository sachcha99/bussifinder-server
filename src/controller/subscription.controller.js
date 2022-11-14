const Subscription = require("../model/subscription.model.js");

// Create and Save a new Subscription
const createSubscription = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Subscription
    const subscription = new Subscription(req.body);
    // Save Subscription in the database
    try {
        const data = await subscription.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Subscription."
        });
    }
};

// Retrieve all Subscriptions from the database.
const findAllSubscription = async (req, res) => {
    try {
        const data = await Subscription.find();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Subscriptions."
        });
    }
}

// Find a single Subscription with a userID
const findOneByUserID = async (req, res) => {
    try {
        const data = await Subscription.findById(req.params.userID);
        if (!data) {
            res.status(404).send({
                message: "Subscription not found with id " + req.params.userID
            });
        }
        res.send(data);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Subscription not found with id " + req.params.userID
            });
        }
        return res.status(500).send({
            message: "Error retrieving Subscription with id " + req.params.userID
        });
    }
}

// Find a single Subscription with a subscriptionID
const findOneBySubscriptionID = async (req, res) => {
    try {
        const data = await Subscription.findById(req.params.subscriptionID);
        if (!data) {
            res.status(404).send({
                message: "Subscription not found with id " + req.params.subscriptionID
            });
        }
        res.send(data);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Subscription not found with id " + req.params.subscriptionID
            });
        }
        return res.status(500).send({
            message: "Error retrieving Subscription with id " + req.params.subscriptionID
        });
    }
};

// Update a Subscription identified by the userID in the request
const updateSubscription = async (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Subscription content can not be empty"
        });
    }
    // Find Subscription and update it with the request body
    try {
        const data = await Subscription.findByIdAndUpdate(req.params.subscriptionID, req.body, {
            new: true
        });
        if (!data) {
            return res.status(404).send({
                message: "Subscription not found with id " + req.params.subscriptionID
            });
        }
        res.send(data);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Subscription not found with id " + req.params.subscriptionID
            });
        }
        return res.status(500).send({
            message: "Error updating Subscription with id " + req.params.subscriptionID
        });
    }
};

// Delete a Subscription with the specified subscriptionID in the request
const deleteSubscription = async (req, res) => {
    try {
        const data = await Subscription.findByIdAndRemove(req.params.subscriptionID);
        if (!data) {
            return res.status(404).send({
                message: "Subscription not found with id " + req.params.subscriptionID
            });
        }
        res.send({ message: "Subscription deleted successfully!" });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Subscription not found with id " + req.params.subscriptionID
            });
        }
        return res.status(500).send({
            message: "Could not delete Subscription with id " + req.params.subscriptionID
        });
    }
};



module.exports ={
    createSubscription,
    findAllSubscription,
    findOneByUserID,
    findOneBySubscriptionID,
    updateSubscription,
    deleteSubscription
}