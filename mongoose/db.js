const mongoose = require("mongoose");

const MakeTypeSchema = new mongoose.Schema({
    _id: String,
    modelId: Number,
    modelName: String
});

const VehicleTypeSchema = new mongoose.Schema({
    _id: String,
    vehicleTypeId: Number,
    vehicleTypeName: String
});

const VehicleSchema = new mongoose.Schema({
    _id:String,
    makeId:Number,
    makeName:String,
    makes:[MakeTypeSchema],
    types:[VehicleTypeSchema]

})

module.exports ={
    Make: mongoose.model("make",MakeTypeSchema),
    Type: mongoose.model("type",VehicleTypeSchema),
    Vehicle: mongoose.model("vehicle", VehicleSchema),
    mongoose

}