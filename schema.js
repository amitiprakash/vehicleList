var { buildSchema } = require('graphql');
/**
 * 
 * Define the type and query schema for graphql
 */

const schema = buildSchema(`
    type Query{
        getVehicles:[Vehicle]
    },

    type Make{
        _id: String,
        modelId :String,
        modelName: String
    },

    type Type{
        _id: String,
        vehicleTypeId :String,
        vehicleTypeName: String

    },

    type Vehicle{
        _id:String,
        makeId:Int,
        makeName:String,
        makes:[Make],
        types:[Type]
    }
`);

module.exports ={
    schema
}