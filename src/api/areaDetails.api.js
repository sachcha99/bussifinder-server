const express = require('express');
const router = express.Router();
const AreaDetailsController = require('../controller/areaDetails.controller');

module.exports = function () {
    router.post('/getAreaAllAttractionPlaces', AreaDetailsController.getAreaAllAttractionPlaces);
    router.post('/getAreaTransportationModesCount', AreaDetailsController.getAreaTransportationModesCount);
    router.post('/getAreaNearByHotels', AreaDetailsController.getAreaNearByHotels);

    router.post('/getAreaBusinessCount', AreaDetailsController.getAreaBusinessCount);
    router.post('/getAreaDistanceToCity', AreaDetailsController.getAreaDistanceToCity);
    router.post('/getAreaWorkPlacesCount', AreaDetailsController.getAreaWorkPlacesCount);
    router.post('/getAreaEducationRelatedPlacesCount', AreaDetailsController.getAreaEducationRelatedPlacesCount);
    router.post('/getAreaShoppingMallsCount', AreaDetailsController.getAreaShoppingMallsCount);
    
    router.post('/getAreaRestaurentCount', AreaDetailsController.getAreaRestaurentCount);

    return router;
}