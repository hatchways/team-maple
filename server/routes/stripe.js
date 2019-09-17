const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

router.post("/charge", async (req, res) => {
  console.log("body is");
  console.log(req.body);
  try {
    let { status } = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body.id,
    });

    res.json({ status });
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
});

router.get("/setupIntent", 
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const setupIntent = await stripe.setupIntents.create({});
      const { client_secret } = setupIntent;
      res.status(200).send({ clientSecret: client_secret });
    } catch (e) { 
      console.log(e);
      res.status(500).end();
    }
});

router.post("/addCard", 
  passport.authenticate('jwt', { session: false }),  
  async (req, res) => {
    try {
      const { payment_method } = req.body.setupIntent;
      const { _id: id } = req.user;
      const user = await User.findById(id);
      
      if (user.customerId) { 
        await stripe.paymentMethods.attach(payment_method, { customer: user.customerId });
      } else {
        const customer = await stripe.customers.create({
          payment_method,
        });
        console.log(customer);
        user.customerId = customer.id;
        await user.save();
      }
      res.status(200).send();
    } catch (e) { 
      console.log(e);
      res.status(500).end();
    }
})

router.get("/listCards", 
  passport.authenticate('jwt', { session: false }),  
  async (req, res) => {
    try {
      const { _id: id } = req.user;
      const user = await User.findById(id);
      
      if (user.customerId) { 
        const paymentMethods = await stripe.paymentMethods.list({
          customer: user.customerId, type: 'card'
        });
        res.status(200).send({ status: "success", paymentMethods, });
      } else {
        res.status(200).send({ status: "error", message: "No cards added" });
      }
    } catch (e) { 
      console.log(e);
      res.status(500).end();
    }
})

module.exports = router;