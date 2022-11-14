const express = require('express');
const router = express.Router();
const PharmacyController = require('../controller/pharmacy.controller');

module.exports = function (){
    router.post('/distanceToBStation', PharmacyController.getDistanceToBusStation);
    router.post('/medicalPlaces', PharmacyController.getMedicalPlaces);
    return router;
}