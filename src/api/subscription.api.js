const express = require('express');
const router = express.Router();
const SubscriptionController = require('../controller/subscription.controller');

module.exports = function () {
    router.get('/', SubscriptionController.findAllSubscription);
    router.post('/create', SubscriptionController.createSubscription);
    router.get('/uid/:userID', SubscriptionController.findOneByUserID);
    router.get('/:subscriptionID', SubscriptionController.findOneBySubscriptionID);
    router.put('/:subscriptionID', SubscriptionController.updateSubscription);
    router.delete('/:subscriptionID', SubscriptionController.deleteSubscription);

    return router;
}