const axios = require('axios');
const {parseData, limit} = require("./util");
const cron = require("node-cron");

const {createVehicles} = require("./mongoose/vehicle")



//Cron expression to run at 1.00PM everyday

cron.schedule('0 13 * * *', () => {
    console.log('cron expression run @ 1.00 PM');
    getAllCarModel();
});

async function getAllCarModel(){
    await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML').then(res =>{
        const jsonResult = parseData(res.data);
        fetchRestOfData(jsonResult.Response.Results.AllVehicleMakes);
    });
    
}

const fetchRestOfData = (listOfcars) =>{
    let urlsForDataRetrieval = [];
   
    listOfcars.forEach(element => {
        let vehicleTypeUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${element.Make_ID}?format=xml`;
        urlsForDataRetrieval.push(limit(() =>
            axios.get(vehicleTypeUrl)
                .then(res => {
                    return formatVehicleTypeData(res.data,element.Make_ID);
                })
                .catch(err => console.log(err))
        
        ));

        let modelUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${element.Make_ID}?format=xml`;
        urlsForDataRetrieval.push(limit(() => 
            axios.get(modelUrl)
                .then(res => {
                    return  formatMakeIdTypeData(res.data,element.Make_ID);
                })
                .catch(err => console.log(err))
        
        ));

        

    });


    Promise.all(urlsForDataRetrieval).then(data =>{
        console.log("All URL CALL COMPLETED");
        prepareCarData(listOfcars,data);
    }).catch(err => console.log(err));


}

const formatVehicleTypeData = (vehicleTypes,makeId) =>{
    const jsonResult = parseData(vehicleTypes);
    const vehicleTypeData = {
        "vehicleTypes" : jsonResult.Response.Results.VehicleTypesForMakeIds,
        "makeId" : makeId
    }
    return vehicleTypeData;
}

const formatMakeIdTypeData = (makeTypes, makeId) =>{
    console.log(makeId);
    const jsonResult = parseData(makeTypes);
    let formattedMakeTypes =[];
    if(jsonResult.Response.Count > 0){
        if(jsonResult.Response.Count == 1){
            formattedMakeTypes[0] = {
                "Model_ID":jsonResult.Response.Results.ModelsForMake.Model_ID,
                "Model_Name":jsonResult.Response.Results.ModelsForMake.Model_Name
            }
        }else{
            formattedMakeTypes = jsonResult.Response.Results.ModelsForMake.map(element =>{
                return {
                    "Model_ID": element.Model_ID,
                    "Model_Name":element.Model_Name
                }
            });
        }
    }
    
    
    const vehicleTypeData = {
        "makeTypes" : formattedMakeTypes,
        "makeId" : makeId
    }
    return vehicleTypeData;
}

const prepareCarData = (carList, additionalData) =>{
    let modifiedCarData = carList;
    additionalData.forEach(data => {
        let indexNumber =carList.findIndex( element => element.Make_ID == data.makeId);
        if(data.hasOwnProperty('vehicleTypes')){
            modifiedCarData[indexNumber].vehicleTypes = data.vehicleTypes;
           
        }else{
            modifiedCarData[indexNumber].makeTypes = data.makeTypes;
        }
    });

    console.log("running every 5 mins");

    //make db call
    //const created = createVehicles(modifiedCarData);

}

module.exports = {
    getAllCarModel:getAllCarModel
}

