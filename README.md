# Gateways
This sample project is managing gateways - master devices that control multiple peripheral devices. 

# Getting Started

## Production
 ### Docker
  You will need to have Docker-engine running, once you have that, you can run the following command to start the gateway project: 
  ``` docker-compose up --build```
  then you can access the gateway project at http://localhost:8080/
## Development
 ### Prerequisites
 Setup the environment:
  frontend .env file:
    ``` REACT_APP_API=http://localhost:5000/api/ ```
  api .env file:
     MONGO_URL=mongodb://localhost:27017/ 
     DB_NAME=gateways
     PORT=5000 

 You will need to have a mongoDB server running, once you have that, you can run the following command to start the gateway project:
 To install all the dependencies in the root of the project run ``` npm run install ```
 Then run ``` npm run dev ``` for running the development envairoment
 If you want to run test use ``` npm run test ```
 ### Quick Start on development mode
  Open a new terminal window and run ``` npm run install ```
  then run ``` npm run dev ```

  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
  The Api will be at [http://localhost:5000](http://localhost:5000/)

  ## API
   Available endpoints:
   ### ```/api/gateways```
     METHODS: GET, POST
   ### ```/api/gateways/:id```
     METHODS: GET, PUT, DELETE
