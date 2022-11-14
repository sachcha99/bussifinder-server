var axios = require('axios');
const jwt = require("jsonwebtoken");

//get_Shopping_Malls_Count
const getShoppingMallsCount = async (req, res) => {



    try {

        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.JWT_SECRET)

        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("Latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("Longitude is missing");

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var config_clothingStore = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=clothing_store&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_supermarket = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=supermarket&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_shoppingMall = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=&location=${latitude},${longitude}&radius=1000&type=shopping_mall&key=${process.env.API_KEY_SECRET}`,
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

const getEducationRelatedPlacesCount = async (req, res) => {

    try {

        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.JWT_SECRET)

        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("Latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("Longitude is missing");

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var config_school = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=700&type=school&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_university = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=700&type=university&keyword=&key=${process.env.API_KEY_SECRET}`,
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
const getWorkPlacesCount = async (req, res) => {

    try {

        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.JWT_SECRET)
        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("Latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("Longitude is missing");

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var config_bank = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=700&type=bank&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_office = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=700&type=local_government_office&keyword=&key=${process.env.API_KEY_SECRET}`,
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

// const getClothingStoresCount = (latitude, longitude) => {
//     var config = {
//         method: 'get',
//         url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=clothing_store&keyword=&key=${process.env.API_KEY_SECRET}`,
//         headers: {}
//     };

//     let count = axios(config)
//         .then(function (response) {
//             let clothingStoresCount = Object.keys(response.data.results).length;
//             return clothingStoresCount
//         })
//         .catch(function (error) {
//             return error;
//         });
//     return count;
// }

// const getSupermarketsCount = (latitude, longitude) => {

//     var config = {
//         method: 'get',
//         url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=supermarket&keyword=&key=${process.env.API_KEY_SECRET}`,
//         headers: {}
//     };

//     let count = axios(config)
//         .then(function (response) {
//             let supermarketsCount = Object.keys(response.data.results).length;
//             return supermarketsCount
//         })
//         .catch(function (error) {
//             return error;
//         });
//     return count;
// }

// const getShoppingmallsCount = async (latitude, longitude) => {

//     var config = {
//         method: 'get',
//         url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=&location=${latitude},${longitude}&radius=1000&type=shopping_mall&key=${process.env.API_KEY_SECRET}`,
//         headers: {}
//     };

//     let count = axios(config)
//         .then(function (response) {
//             let shoppingmallsCount = Object.keys(response.data.results).length;
//             return shoppingmallsCount
//         })
//         .catch(function (error) {
//             return error;
//         });
//     return count;
// }



const findTotalCount = async (config, soFar = []) => {
    let data = await axios(config)
        .then(function (response) {
            const allResults = soFar.concat(response.data.results);
            console.log("Loading...")
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


//get getDistanceToCity
const getDistanceToCity = async (req, res) => {
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

//get getRating
const getRating = async (req, res) => {
    if (req.body) {
        console.log("req.body", req.body)
        if (!req.body.name) return res.status(500).send("Name is missing");
        const name = req.body.name;

        var config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=${process.env.API_KEY_SECRET}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                res.status(200).send(response.data.results[0].rating.toString())
                console.log("rating", response.data.results[0].rating)
                console.log("user_ratings_total", response.data.results[0].user_ratings_total)
            })
            .catch(function (error) {
                res.send(error);
            });
    }
}

//get getLocationDetails
const getDetails = async (req, res) => {
    if (req.body) {
        if (!req.body.name) return res.status(500).send("Name is missing");
        const name = req.body.name;

        console.log("req.body", name)
        var config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=${process.env.API_KEY_SECRET}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                const details = {
                    latitude: response.data.results[0].geometry.location.lat,
                    longitude: response.data.results[0].geometry.location.lng,
                    rating: response.data.results[0].rating,
                    rating_count: response.data.results[0].user_ratings_total,
                    place_id: response.data.results[0].place_id
                }
                console.log("details", details)
                res.status(200).send(details)
            })
            .catch(function (error) {
                res.send(error);
            });
    }
}

//get getPlaceFullDetails
const getPlaceDetails = async (req, res) => {
    if (req.body) {
        console.log("req.body", req.body)
        if (!req.body.placeId) return res.status(500).send("place id is missing");
        const placeId = req.body.placeId;

        var config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.API_KEY_SECRET}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                let close = response.data.result.opening_hours.periods[0].close;
                let open = response.data.result.opening_hours.periods[0].open;
                let address = response.data.result.formatted_address;
                let phoneNo = response.data.result.formatted_phone_number;
                let website = response.data.result.website ? response.data.result.website : response.data.result.url;
                let details;

                if (close) {
                    details = {
                        closeTime: close.time,
                        openTime: open.time,
                        address: address,
                        phoneNo: phoneNo,
                        website: website
                    }
                } else {
                    details = {
                        closeTime: "24 hours",
                        openTime: "24 hours",
                        address: address,
                        phoneNo: phoneNo,
                        website: website
                    }
                }
                console.log("details", details)
                res.status(200).send(details)
            })
            .catch(function (error) {
                res.send(error);
            });
    }
}

//getCompetitorsCount
const getCompetitorsCount = async (req, res) => {

    try {

        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.JWT_SECRET)

        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("Latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("Longitude is missing");

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var config_restaurant = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&keyword=restaurant&key=${process.env.API_KEY_SECRET}`,
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

//getOtherBussinesCount

const getBusinessCount = async (req, res) => {

    try {

        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.JWT_SECRET)
        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("Latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("Longitude is missing");

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;

            var config_atm = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=700&type=atm&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_hospital = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=700&type=hospital&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_restaurant = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=700&type=restaurant&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_pharmacy = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=700&type=pharmacy&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };
            var config_gas_station = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=700&type=gas_station&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_movie_theater = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=700&type=restaurant&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: {}
            };

            var config_hotel = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=700&type=pharmacy&keyword=&key=${process.env.API_KEY_SECRET}`,
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
module.exports = {
    getBusinessCount,
    getShoppingMallsCount: getShoppingMallsCount,
    getDistanceToCity,
    getRating,
    getDetails,
    getPlaceDetails,
    getCompetitorsCount,
    getWorkPlacesCount,
    getEducationRelatedPlacesCount
}