var axios = require('axios');

//main competitor count
const GetCompetitorsCount = async (req, res) => {
  console.log("user request comp",req.body)
    if (!req.body.latitude) return res.status(500).send("latitude  is missing");
    if (!req.body.longitude) return res.status(500).send("longitude is missing");
    const latitude  = req.body.latitude;
    const longitude = req.body.longitude;

    console.log("Location details comp - ",latitude,longitude)

    let competitorsCount = await getCompetitorsCount(latitude ,longitude);
    console.log("Count of Competitors-->",competitorsCount)  
    res.status(200).send({"CompetitorCount" : competitorsCount})

}
//main get traffic data
const GetTrafficSummation = async (req, res) => {
  console.log("user request traff",req.body)
  if (!req.body.latitude) return res.status(500).send("latitude  is missing");
  if (!req.body.longitude) return res.status(500).send("longitude is missing");
    const latitude  = req.body.latitude;
    const longitude = req.body.longitude;

    console.log("Location details traf= ",latitude,longitude)

    let cityName = await GetCityName(latitude,longitude) 
    console.log("city name =",cityName) 

    let cityobLongLat = await GetCityLongLat(cityName)
    let deslat = cityobLongLat.latitude
    let deslong = cityobLongLat.longitude
    console.log("city longlat-->",deslat,"",deslong)

    let trafficdata =await getTrafficData(latitude,longitude,deslat,deslong)
    console.log("traffic data sumation--->",trafficdata)
    res.status(200).send({"TraffciSummation" : trafficdata})
}


//Get the competitors count
const getCompetitorsCount = (latitude ,longitude) => {
    var config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=grocery&location=${latitude},${longitude}&radius=500&type=grocery&keyword=cruise&key=${process.env.API_KEY_SECRET}`,
      headers: { }
    };
    
    let count = axios(config)
    .then(function (response) {
        const nearbyres=(response.data)
        const competitors = nearbyres.results
        const numberOfCompetitors = competitors.length
        console.log("comp count---",numberOfCompetitors)
        return numberOfCompetitors
       
    })
    .catch(function (error) {
        return error;
    });
    return count;
}

//Get the city name
const GetCityName = async (latitude ,longitude) => {
  var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.API_KEY_SECRET}`,
    headers: { }
  };
 
  let count = axios(config)
  .then(function (response) {
    console.log(response.data)
    let cityNamefull = response.data.plus_code.compound_code.split(" ")
    var cityName =cityNamefull[1]
    console.log("city Name==>",cityName)
    return cityName
   
  })
  .catch(function (error) {
    console.log(error);
  });count
return count
}

//Getting LongLat on the City
const GetCityLongLat = (cityName) => {
  var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${cityName}, Sri Lanka&key=${process.env.API_KEY_SECRET}`,
    headers: { }
  };
  
  let count = axios(config)
  .then(function (response) {
    const latitude = response.data.results[0].geometry.location.lat
    const longitude = response.data.results[0].geometry.location.lng
    const cityLongLat={"latitude":latitude,"longitude":longitude}
    console.log("ccccc---",cityLongLat)
    return cityLongLat
  })
  .catch(function (error) {
    console.log(error);
  });
 return count
}

//Get traffic data summation
const getTrafficData = async (latitude ,longitude,deslat,deslong) => {
  var trafficValueSum = 0
    var config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${latitude},${longitude}&destinations=${deslat},${deslong}&departure_time=now&key=${process.env.API_KEY_SECRET}`,
      headers: { }
    };
    
    let count = axios(config)
    
    .then(function (response) {
        //const rows = response.data.rows[0].elements[0].duration_in_traffic.value
        const rows = response.data.rows
        const rowCount = rows.length
        console.log("traffic-->",rows);
        console.log("row length-->",rowCount);
        var rowel=0  
        while(rowel<rowCount){
          let rows = response.data.rows[rowel].elements.length
          console.log("test1-->",rows)
          var elementlen = 0
          while(elementlen<rows){
            let rows = response.data.rows[rowel].elements[elementlen].duration_in_traffic.value
            console.log("test2==>",rows)
            trafficValueSum = trafficValueSum+rows
            console.log("traffic sum-->",trafficValueSum)

            elementlen++
        }
        rowel++
      }
      return trafficValueSum
     
    })
    .catch(function (error) {
      console.log(error);
    });
    return count
    
}
module.exports = {
    GetCompetitorsCount,
    GetTrafficSummation
}