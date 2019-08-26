# Tattoo Inspirations

A website that finds users the best tattoo design. Users put up a prize and describe what they want. Others can submit a design that best fits that description. The best design will win the prize money!

## Local Build

1. clone or download the repository
2. setup the server side
   1. From the root folder, enter the server directory `cd server`
   2. Run the command `npm install`
3. setup the client side
   1. From the root folder, enter the client directory `cd client`
   2. Run the command `npm install`
4. Setup the environment variables
   1. Create an .env file in the server directory
   2. Add the line `MONGODB_URI="YOUR_MONGO_DATABASE_URI"` in the .env file
5. Start the client
    1. In the client directory, run the command `npm start`
6. Start the server
    1. In the server directory, run the command `npm run dev`
7. The website can be found in http://localhost:3000/

## Requirements

* Nodejs installed on your computer
    * Check by running this command in the terminal `node --version`
    * If not installed, go to https://nodejs.org to download
* A MongoDB database
    * Can install a local database by downloading mongodb from https://www.mongodb.com/ and have it run before starting up the server and client
    * Can create an online database for free at https://mlab.com/

## Authors

* [Kajen Kirubah](https://github.com/kajenkirubah)
* [John Ramos](https://github.com/johnisr)
