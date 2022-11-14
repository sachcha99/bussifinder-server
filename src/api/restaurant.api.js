const express = require('express');
const router = express.Router();
const RestaurantController = require('../controller/restaurant.controller');

module.exports = function (){
    router.post('/ShoppingMallsCount', RestaurantController.getShoppingMallsCount);
    router.post('/DistanceToCity', RestaurantController.getDistanceToCity);
    router.post('/Rating', RestaurantController.getRating);
    router.post('/LocationDetails', RestaurantController.getDetails);
    router.post('/PlaceDetails', RestaurantController.getPlaceDetails);
    router.post('/Competitors', RestaurantController.getCompetitorsCount);
    router.post('/Education', RestaurantController.getEducationRelatedPlacesCount);
    router.post('/WorkPlaces', RestaurantController.getWorkPlacesCount);
    router.post('/BusinessCount', RestaurantController.getBusinessCount);
    return router;
}
