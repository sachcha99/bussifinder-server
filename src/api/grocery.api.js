const express = require('express');
const router = express.Router();
const GetGroceryData = require('../controller/grocery.controller');


module.exports = function (){
    router.post('/grocerycompetitor', GetGroceryData.GetCompetitorsCount);
    router.post('/grocerytraffci',GetGroceryData.GetTrafficSummation)
    return router;
}