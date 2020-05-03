const express = require('express');
var graphqlHTTP = require('express-graphql');
//graphql schema
const {schema} = require("./schema")
const {getVehicleData} = require("./mongoose/vehicle");

const app = express();

const DB_URL = "mongodb+srv://new-user-01:laWjUmzGHuzHQVtq@cluster0-4nl5f.mongodb.net/CARS?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose.connect(DB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on("error", error => {
    console.error(error);
    process.exit(1);
});
//invokes the cron expression in the file to run the fetching method everyday at 1 PM
require("./fetchDataModule");

const {getAllCarModel} = require("./fetchDataModule");

//map graphql query to mongo query
const root = {
    getVehicles: getVehicleData
}

app.use('/graphql', graphqlHTTP({
    schema: schema,  // Must be provided
    rootValue: root,
    graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
}));

app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
});


// Uncomment to get all the car model details when the app starts
//const something = getAllCarModel();