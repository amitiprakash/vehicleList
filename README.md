The Project can be started by calling npm start.

Project starts at server.js

need to add ip to whitelist to access mongodb

graphql query to fetch data

{
  getVehicles {
    makeId
    makeName
    makes {
      modelId
      modelName
    }
    types {
      vehicleTypeId
      vehicleTypeName
    }
  }
}
