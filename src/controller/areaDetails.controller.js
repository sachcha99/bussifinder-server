var axios = require('axios');
const jwt = require("jsonwebtoken");

//get_Area_Transportation_Modes_count
const getAreaTransportationModesCount = async (req, res) => {
    try {
        const radius = req.body.radius;
        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.JWT_SECRET)

        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("Latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("Longitude is missing");

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;


            var config_bus = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=bus_station&keyword=bus_station&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_train = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=3000&type=train_station&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_airport = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=&location=${latitude},${longitude}&radius=5000&type=airport&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };


            console.log("Location - ", latitude, longitude)

            const busStationCount = await findTotalCount(config_bus);
            console.log("busStationCount", busStationCount.length)

            const trainStationCount = await findTotalCount(config_train);
            console.log("trainStationCount", trainStationCount.length)

            const airportCount = await findTotalCount(config_airport);
            console.log("airportCount", airportCount.length)

            if (busStationCount.length > -1 && trainStationCount.length > -1 && airportCount.length > -1) {
                let transpotation_count = busStationCount.length + trainStationCount.length + airportCount.length;
                res.status(200).send({ "transportationmodes_count": transpotation_count })
                console.log("Transportationmodes_count - ", transpotation_count);
            } else {
                res.status(500).send("Something went wrong");
            }
        } else {
            res.status(500).send("Something went wrong");
        }
    } catch (error) {
        res.status(500).send(error);
    }

}


//get All Area attraction Places
const getAreaAllAttractionPlaces = async (req, res) => {

    const radius = req.body.radius;
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.JWT_SECRET)

    try {
        if (req.body) {
            console.log("call", req.body)
            if (!req.body.latitude) return res.status(500).send("latitude is missing");
            if (!req.body.longitude) return res.status(500).send("longitude is missing");
            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var config_attraction = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=tourist_attraction&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };


            await findTotalCount(config_attraction).then(function (response) {
                if (response.length > -1) {
                    res.status(200).send({ "attractionplaces_count": response.length });
                    console.log("Attractionplaces_count -", response.length);
                } else {
                    res.status(500).send("Something went wrong");
                }


            }).catch(function (error) {
                return error;
            });

        }
    } catch (error) {
        res.status(500).send(error);
    }

}

//get All Near By Hotels
const getAreaNearByHotels = async (req, res) => {

    const radius = req.body.radius;
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.JWT_SECRET)

    try {
        if (req.body) {
            console.log("call", req.body)
            if (!req.body.latitude) return res.status(500).send("latitude is missing");
            if (!req.body.longitude) return res.status(500).send("longitude is missing");
            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var config_hotels = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=hotel&keyword=hotel&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            await findTotalCount(config_hotels).then(function (response) {
                let rating_count = 0;
                for (let i = 0; i < response.length; i++) {
                    rating_count = rating_count + response[i].user_ratings_total;
                }
                console.log("Hotel_count -", response.length);
                return res.status(200).send({ "hotel_count": response.length, "rating_count": rating_count });
                // return res.status(200).send(response);

            }).catch(function (error) {
                return error;
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
    
}

const findTotalCount = async (config, soFar = []) => {
    console.log("Searching...")
    let data = await axios(config)
        .then(function (response) {
            const allResults = soFar.concat(response.data.results);
            if (response.data.next_page_token) {
                return new Promise(resolve => setTimeout(resolve, 2000)).then(() => findTotalCount({
                    method: 'get',
                    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${response.data.next_page_token}&key=${process.env.API_KEY_SECRET}`,
                    headers: {}
                }, allResults));
            }
            return allResults;
        })
        .catch(function (error) {
            return error;
        });

    return data;
}



// Restaurent


//get_Shopping_Malls_Count
const getAreaShoppingMallsCount = async (req, res) => {



    try {
        const radius = req.body.radius;
        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.JWT_SECRET)

        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("Latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("Longitude is missing");

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var config_clothingStore = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=clothing_store&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_supermarket = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=supermarket&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_shoppingMall = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=&location=${latitude},${longitude}&radius=${radius}&type=shopping_mall&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };


            console.log("Location - ", latitude, longitude)




            const clothingStoresCount = await findTotalCount(config_clothingStore);
            console.log("clothingStoresCount", clothingStoresCount.length)

            const supermarketsCount = await findTotalCount(config_supermarket);
            console.log("supermarketsCount", supermarketsCount.length)

            const shoppingmallsCount = await findTotalCount(config_shoppingMall);
            console.log("shoppingmallsCount", shoppingmallsCount.length)

            if (clothingStoresCount.length > -1 && supermarketsCount.length > -1 && shoppingmallsCount.length > -1) {
                let totalShoppingMallsCount = clothingStoresCount.length + supermarketsCount.length + shoppingmallsCount.length;
                res.status(200).send({ "totalShoppingMallsCount": totalShoppingMallsCount })
            } else {
                res.status(500)
            }
        } else {
            res.status(500)
        }
    } catch (error) {
        res.status(500).send(error);
    }



}

//getEducationRelatedPlacesCount

const getAreaEducationRelatedPlacesCount = async (req, res) => {

    try {
        const radius = req.body.radius;
        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.JWT_SECRET)

        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("Latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("Longitude is missing");

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var config_school = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=school&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_university = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=university&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };


            console.log("Location - ", latitude, longitude)




            const schoolsCount = await findTotalCount(config_school);
            console.log("SchoolsCount", schoolsCount.length)

            const universitiesCount = await findTotalCount(config_university);
            console.log("universitiesCount", universitiesCount.length)

            if (schoolsCount.length > -1 && universitiesCount.length > -1) {
                let totalEducationRelatedPlacesCount = schoolsCount.length + universitiesCount.length;
                res.status(200).send({ "totalEducationRelatedPlacesCount": totalEducationRelatedPlacesCount })
            } else {
                res.status(500)
            }
        } else {
            res.status(500)
        }
    } catch (error) {
        res.status(500).send(error);
    }


}


//getWorkPlacesCount
const getAreaWorkPlacesCount = async (req, res) => {

    try {

        const token = req.headers['x-access-token'];
        const radius = req.body.radius;
        jwt.verify(token, process.env.JWT_SECRET)
        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("Latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("Longitude is missing");

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var config_bank = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=bank&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_office = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=local_government_office&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };


            console.log("Location - ", latitude, longitude)




            const banksCount = await findTotalCount(config_bank);
            console.log("BanksCount", banksCount.length)

            const officesCount = await findTotalCount(config_office);
            console.log("officesCount", officesCount.length)

            if (banksCount.length > -1 && officesCount.length > -1) {
                let totalWorkPlacesCount = banksCount.length + officesCount.length;
                res.status(200).send({ "totalWorkPlacesCount": totalWorkPlacesCount })
            } else {
                res.status(500)
            }
        } else {
            res.status(500)
        }

    } catch (error) {
        res.status(500).send(error);
    }



}



//get getDistanceToCity
const getAreaDistanceToCity = async (req, res) => {
    try {

        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.JWT_SECRET)

        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("longitude is missing");
            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var configGeoCode = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            axios(configGeoCode)
                .then(function (response) {
                    let city = response.data.plus_code.compound_code;

                    var configDistanceMatrix = {
                        method: 'get',
                        url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${city}&origins=${latitude},${longitude}&key=${process.env.API_KEY_SECRET}`,
                        headers: {}
                    };

                    axios(configDistanceMatrix)
                        .then(function (response) {
                            res.status(200).send(response.data.rows[0].elements[0].distance.text);
                        })
                        .catch(function (error) {
                            res.send(error);
                        });
                })
                .catch(function (error) {
                    res.send(error);
                });
        }

    } catch (error) {
        res.status(500).send(error);
    }


}


//getOtherBussinesCount

const getAreaBusinessCount = async (req, res) => {

    try {
        const radius=req.body.radius;
        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.JWT_SECRET)
        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("Latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("Longitude is missing");

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var config_atm = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=atm&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_hospital = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=hospital&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_restaurant = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_pharmacy = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=pharmacy&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };
            var config_gas_station = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=gas_station&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_movie_theater = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_hotel = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=pharmacy&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            console.log("Location - ", latitude, longitude)




            const atmCount = await findTotalCount(config_atm);
            console.log("atmCount", atmCount.length)

            const hospitalCount = await findTotalCount(config_hospital);
            console.log("hospitalCount", hospitalCount.length)

            const restaurantCount = await findTotalCount(config_restaurant);
            console.log("hospitalCount", hospitalCount.length)

            const pharmacyCount = await findTotalCount(config_pharmacy);
            console.log("pharmacyCount", pharmacyCount.length)

            const gasStationCount = await findTotalCount(config_gas_station);
            console.log("gasStationCount", gasStationCount.length)

            const movieTheaterCount = await findTotalCount(config_movie_theater);
            console.log("movieTheaterCount", movieTheaterCount.length)

            const hotelCount = await findTotalCount(config_hotel);
            console.log("hotelCount", hotelCount.length)


            // if (banksCount.length > -1 && officesCount.length > -1) {
            res.status(200).send({ "atmCount": atmCount.length, "restaurantCount": restaurantCount.length, "hospitalCount": hospitalCount.length, "pharmacyCount": pharmacyCount.length, "gasStationCount": gasStationCount.length, "movieTheaterCount": movieTheaterCount.length, "hotelCount": hotelCount.length })
            // } else {
            //     res.status(500)
            // }
        } else {
            res.status(500)
        }


    } catch (error) {
        res.status(500).send(error);
    }

}


//getCompetitorsCount
const getAreaRestaurentCount = async (req, res) => {

    try {
        const radius=req.body.radius;
        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.JWT_SECRET)

        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("Latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("Longitude is missing");

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var config_restaurant = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&keyword=restaurant&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };
            console.log("Location - ", latitude, longitude)

            const restaurantsCount = await findTotalCount(config_restaurant);
            console.log("restaurantsCount", restaurantsCount.length)


            if (restaurantsCount.length > -1) {
                let totalRestaurantsCount = restaurantsCount.length;
                res.status(200).send({ "totalRestaurantsCount": totalRestaurantsCount })
                return { "totalRestaurantsCount": totalRestaurantsCount }
            } else {
                res.status(500)
            }
        } else {
            res.status(500)
        }

    } catch (error) {
        res.status(500).send(error);
    }



}

module.exports = {
    getAreaAllAttractionPlaces,
    getAreaTransportationModesCount,
    getAreaNearByHotels,
    getAreaBusinessCount,
    getAreaDistanceToCity,
    getAreaWorkPlacesCount,
    getAreaEducationRelatedPlacesCount,
    getAreaShoppingMallsCount,
    getAreaRestaurentCount
}