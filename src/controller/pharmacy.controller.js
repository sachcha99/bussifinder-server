var axios = require('axios');

//get all medical related places count
const getMedicalPlaces = async (req, res) => {
    if(req.body){

        if (!req.body.latitude) return res.status(500).send("latitude  is missing");
        if (!req.body.longitude) return res.status(500).send("longitude is missing");
        const latitude  = req.body.latitude;
        const longitude = req.body.longitude;

        var configHospitals = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=hospital&location=${latitude},${longitude}&radius=500&type=hospitals&keyword=&key=${process.env.API_KEY_SECRET}`,
        headers: { }
        };
        
        axios(configHospitals)
        .then(function (response) {
            const hospitalCount = response.data.results.length;
            console.log(hospitalCount," hospitals")
            var configLab = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=medical laboratory&location=${latitude},${longitude}&radius=500&type=medical laboratory&keyword=&key=${process.env.API_KEY_SECRET}`,
                headers: { }
                };
                
                axios(configLab)
                .then(function (response) {
                    const labCount = response.data.results.length;
                    console.log(labCount," labs")
                    var configClinic = {
                        method: 'get',
                        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=medical clinic&location=${latitude},${longitude}&radius=500&type=medical clinic&keyword=&key=${process.env.API_KEY_SECRET}`,
                        headers: { }
                        };
                        
                        axios(configClinic)
                        .then(function (response) {
                            const clinicCount = response.data.results.length;
                            console.log(clinicCount," clinics")
                            const medicalPlacesCount = hospitalCount + labCount + clinicCount;
                            res.status(200).send({"MediPlacesCount" : medicalPlacesCount});
                        })
                        .catch(function (error) {
                            res.send(error);
                        });
                })
                .catch(function (error) {
                    res.send(error);
                });
        })
        .catch(function (error) {
            res.send(error);
        });
    }
}

//get nearest bus station and get the distance between user given location and the bus station
const getDistanceToBusStation = async (req, res) => {
    if (req.body) {
        console.log("distance",req.body )
        if (!req.body.latitude) return res.status(500).send("latitude  is missing");
        if (!req.body.longitude) return res.status(500).send("longitude is missing");
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        console.log("eeeee",latitude,longitude)
        
        var config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=bus station&location=${latitude},${longitude}&radius=6000&type=bus station&keyword=&key=${process.env.API_KEY_SECRET}`,
            headers: { }
        };

        axios(config)
            .then(function (response) {
                //console.log("23232xcc",response.data.results)
                let newlongitude = response.data.results[0].geometry.location.lat;
                let newlatitude = response.data.results[0].geometry.location.lng;
                console.log("Nearest Bus station latitude: ",newlatitude);
                console.log("Nearest Bus station longitude: ",newlongitude);

                var configDistanceMatrix = {
                    method: 'get',
                    url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${latitude},${longitude}&origins=${newlongitude},${newlatitude}&key=${process.env.API_KEY_SECRET}`,
                    headers: {}
                };

                axios(configDistanceMatrix)
                .then(function (response) {
                    
                    //console.log(response.data.rows[0].elements);
                    let distance = response.data.rows[0].elements[0].distance.value;
                    //res.status(200).send(response.data.rows[0].elements[0].distance.value);
                    res.status(200).send({ "distance": distance })
                    console.log("Distance to nearest bus station: ",distance);
                })
                .catch(function (error) {
                    res.send(error);
                });
            })
            .catch(function (error) {
                res.send(error);
            });
    }
}

module.exports = {
    getMedicalPlaces,
    getDistanceToBusStation
}