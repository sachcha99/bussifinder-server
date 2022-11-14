
var axios = require('axios');
const jwt = require("jsonwebtoken");

//get_Transportation_Modes_count
const getTransportationModesCount = async (req, res) => {
    try {

        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.JWT_SECRET)

        if (req.body) {

            if (!req.body.latitude) return res.status(500).send("Latitude  is missing");
            if (!req.body.longitude) return res.status(500).send("Longitude is missing");

            const latitude = req.body.latitude;
            const longitude = req.body.longitude;


            var config_bus = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=bus_station&keyword=bus_station&key=${process.env.API_KEY_SECRET}`,
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



//get All attraction Places
const getAllAttractionPlaces = async (req, res) => {

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
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&type=tourist_attraction&keyword=&key=${process.env.API_KEY_SECRET}`,
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
const getAllNearByHotels = async (req, res) => {

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
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=hotel&keyword=hotel&key=${process.env.API_KEY_SECRET}`,
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
                let address = response.data.result.formatted_address;
                let phoneNo = response.data.result.formatted_phone_number;
                let website = response.data.result.website ? response.data.result.website : response.data.result.url;
                let details = {
                    address: address,
                    phoneNo: phoneNo,
                    website: website
                }

                console.log("details", details)
                res.status(200).send(details)
            })
            .catch(function (error) {
                res.send(error);
            });
    }
}


module.exports = {
    getTransportationModesCount,
    getAllAttractionPlaces,
    getAllNearByHotels,
    getPlaceDetails
}