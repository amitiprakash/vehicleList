const {Vehicle, mongoose} = require("./db");

/**
 * All queries of the vehicle module is defined here.
 * 
 */
module.exports ={
    createVehicles:createVehicles,
    getVehicleData:getVehicleData
}
/**
 * Get all the vehicle details
 */
async function getVehicleData(){
    let data = Vehicle.find();
    return data;
}

/**
 * 
 * Array of vehicle object retreived // can be optimised further
 */

async function createVehicles(vehicles){
    let vehicledata = updateDataForDB(vehicles);  
    return new Promise((resolve, reject) => {
        
        Vehicle.insertMany(vehicledata, (error, docs) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(docs);
                console.log("completed insertion");
            }
        });
    }); 
}

//to be optimised
const updateDataForDB = (data) =>{
    let updatedData = data.map(vehicle =>{
        let make, type = [];
        if(Array.isArray(vehicle.makeTypes)){
            make = vehicle.makeTypes.map(make =>{
                return {
                    "_id":mongoose.Types.ObjectId(),
                    "modelId": make.Model_ID,
                    "modelName":make.Model_Name
                }
            });
        }else if(vehicle.makeTypes){
            make[0]= {
                "_id":mongoose.Types.ObjectId(),
                "modelId": vehicle.makeTypes.Model_ID,
                "modelName":vehicle.makeTypes.Model_Name
            }
        }
        

        if(Array.isArray(vehicle.vehicleTypes)){
            type = vehicle.vehicleTypes.map(type =>{
                return {
                    "_id":mongoose.Types.ObjectId(),
                    "vehicleTypeId": type.VehicleTypeId,
                    "vehicleTypeName":type.VehicleTypeId
                }
            });
        }else if(vehicle.vehicleTypes){
            type[0]= {
                "_id":mongoose.Types.ObjectId(),
                "vehicleTypeId": vehicle.vehicleTypes.VehicleTypeId,
                "vehicleTypeName":vehicle.vehicleTypes.VehicleTypeId
            }
        }
        
        return {
            "_id":mongoose.Types.ObjectId(),
            "makeId":vehicle.Make_ID,
            "makeName":vehicle.Make_Name,
            "makes":make,
            "types":type
        }
    });

    return updatedData;
}