require('dotenv').config()
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
// const fileUpload = require('express-fileupload')
const connectDB = require("./src/config/database");
const HotelAPI = require("./src/api/hotel.api");
const RestaurantAPI = require("./src/api/restaurant.api");
const Pharmacy = require("./src/api/pharmacy.api");
const GroceryAPI = require("./src/api/grocery.api")
const UserAPI = require("./src/api/user.api")
const SubscriptionAPI = require("./src/api/subscription.api")
const AreaDetailsAPI = require("./src/api/areaDetails.api")


const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
// app.use(fileUpload({
//   useTempFiles: true
// }))
connectDB();

app.get("/", (req, res) => {
    res.send("Hello Node!");
});

app.use("/hotel", HotelAPI());
app.use("/restaurant", RestaurantAPI());
app.use("/pharmacy",Pharmacy());
app.use("/grocery", GroceryAPI());
app.use("/user", UserAPI());
app.use("/subscription", SubscriptionAPI());
app.use("/areaDetails", AreaDetailsAPI());


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});