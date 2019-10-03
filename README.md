# Tattoo Competition

A website that finds users the best tattoo design. Users put up a prize and describe what they want. Others can submit a design that best fits that description. The best design will win the prize money!

A live demo can be found [here](https://tattoo-competition.herokuapp.com)

## Features

* Styling with Material-UI
* React and Redux front end
* Node, Express, MongoDB, Mongoose back end
* Authentication with jwt tokens and passport.js
* Scalable file upload to AWS S3 with presigned urls
* Real-time chat and notifications with socket.io
* Payment and Payouts with Stripe 

## Local Build

1. clone or download the repository
2. setup the server side
    * From the root folder, run the command `npm install`
3. setup the client side
    * From the root folder, enter the client directory with `cd client`
    * Run the command `npm install`
4. Setup the environment variables
    * Read the Environment Variables section to know what is needed
5. Start the client
    * In the client directory, run the command `npm start`
6. Start the server
    * In the server directory, run the command `npm run dev`
7. The website can be found in http://localhost:3000/

## Requirements

* Nodejs installed on your computer
    * Check by running this command in the terminal `node --version`
    * If not installed, go to https://nodejs.org to download
* A MongoDB database
    * Can install a local database by downloading mongodb from https://www.mongodb.com/ and have it run before starting up the server and client
    * Can create an online database for free at https://mlab.com/
* An AWS account and an S3 bucket
    * Do not use your root account's credentials for this (or any) app. Create a new user with permissions only for the specific S3 bucket
    * For the S3 bucket, make sure to [enable public access](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/block-public-access-bucket.html). Change the CORS configuration of the bucket to allow GET requests from any origin and PUT requests from http://localhost:3000 (and your production url if any). More info [here](https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html)
* A Stripe account

## Environment Variables

* **DO NOT COMMIT YOUR .ENV VARIABLES.**
* There are two .env files needed, one in the root folder and another in /client
* Client folder .env
    * REACT_APP_S3_URL - The url of your S3 bucket
    * REACT_APP_STRIPE_KEY - the public test key of your stripe account
* Root folder .env
    * MONGODB_URI - The url of your mongodb database
    * SECRETORKEY - The string used for signing and verifying jwt tokens. It should be at least 256 bits (32 bytes, or characters) minimum, with more being better.
    * S3_REGION - the region your bucket is in
    * S3_BUCKET - the name of the S3 bucket
    * AWS_ACCESS_KEY_ID - the AWS Access Key Id of the user with permissions limited to this bucket
    * AWS_SECRET_ACCESS_KEY - the AWS Secret access key of the user with permissions limited to this bucket
    * STRIPE_SECRET_KEY - the private test key of your stripe account
* **DO NOT COMMIT YOUR .ENV VARIABLES.**

## Authors

* [Kajen Kirubah](https://github.com/kajenkirubah)
* [John Ramos](https://github.com/johnisr)