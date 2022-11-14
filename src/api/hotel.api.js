const express = require('express');
const router = express.Router();
const HotelController = require('../controller/hotel.controller');

module.exports = function (){
    router.post('/transportationmodes', HotelController.getTransportationModesCount);
    router.post('/attractionplaces', HotelController.getAllAttractionPlaces);
    router.post('/nearbyhotel', HotelController.getAllNearByHotels);
    router.post('/placefulldetails', HotelController.getPlaceDetails);
    return router;
}
