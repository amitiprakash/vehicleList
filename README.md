The Project can be started by calling npm start.

Project starts at server.js

need to add ip to whitelist to access mongodb


Test graphql  at http://localhost:8000/graphql


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


method call to fetch data gets invoked at 1PM everyday( cron expression and code in fetchDataModule.js)