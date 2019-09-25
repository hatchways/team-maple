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
      amount: 20000,
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
      const { customerId } = req.user;
      
      if (customerId) { 
        const paymentMethods = await stripe.paymentMethods.list({
          customer: customerId, type: 'card'
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

// Stripe Account Routes

// Returns the fields needed
router.post("/account/get",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user);
    const stripeAccountId = req.user.accountId;
    if (!stripeAccountId) {
      // Need to start process to create account
      res.send({
        success: true,
        message: "Missing stripe account.",
        setupBegan: false,
        account: null,
      });
    } else {
      stripe.accounts.retrieve(stripeAccountId, (err, account) => {
        if (err) {
          // Error with retrieving account information
          res.send({
            success: false,
            message: `Error: ${err.message}`,
            setupBegan: true,
          });
        } else {
          console.log(account);
          if (!account.tos_acceptance.date) {
            // account created by being a winner, not by accepting TOS
            res.send({
              success: true,
              message: "Missing stripe account.",
              setupBegan: false,
              account: null,
            });
          } else {
            // account created and already accepted TOS
            res.send({
              success: true,
              message: "Stripe account.",
              setupBegan: true,
              account,
            });
          }
        }
      })
    }
});

// Begin Stripe Connect setup
router.post("/account/setup",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const country = req.body.countryCode;
    const { email, id: userId, accountId } = req.user;

    if (country !== "CA") {
      res.send({
        success: false,
        message: "Error: Invalid country",
      });
    } else {
      if (accountId) {
        // account already made, just need to accept TOS
        stripe.accounts.retrieve(accountId, async (err, account) => {
          if (err) {
            // Error with retrieving account information
            res.send({
              success: false,
              message: `Error: ${err.message}`,
              setupBegan: true,
            });
          } else {
            const { id } = account;
            try {
              await stripe.accounts.update(
                id,
                {
                  tos_acceptance: {
                    date: Math.floor(Date.now() / 1000),
                    ip: req.ip,
                  }
                },
              );
              res.send({
                success: true,
                message: "Account setup has begun",
              });
            } catch (e) {
              console.log(e);
            }
          }
        })
      } else {
        // create an account and accept the TOS
        stripe.accounts.create({
          type: "custom",
          country,
          email,
        }, async (err, account) => {
          if (err) {
            res.send({
              success: false,
              message: `Error: ${err.message}`,
            })
          } else {
            console.log("account", account);
  
            const user = await User.findById(userId);
            user.accountId = account.id;
            await user.save();
  
            const { id } = account;
            try {
              await stripe.accounts.update(
                id,
                {
                  tos_acceptance: {
                    date: Math.floor(Date.now() / 1000),
                    ip: req.ip,
                  }
                },
              );
              res.send({
                success: true,
                message: "Account setup has begun",
              });
            } catch (e) {
              console.log(e);
            }
          }
        })
      }
    }
});

router.post("/account/save",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const stripeAccountId = req.user.accountId;

    if (!stripeAccountId) {
      res.send({
        success: true,
        message: "Missing stripe account.",
        setupBegan: false,
        account: null,
      });
    } else {
      const updateObj = {};
      const {
        day,
        month,
        year,
        first_name,
        last_name,
        type,
        city,
        line1,
        postal_code,
        state,
        personal_id_number,
      } = req.body;
      
      if (day && month && year) {
        updateObj.legal_entity = {};
        updateObj.legal_entity.dob = {
          day, month, year
        };
      }
      if (first_name && last_name) {
        updateObj.legal_entity = {
          ...updateObj.legal_entity,
          first_name,
          last_name,
        }
      }

      if (type) {
        updateObj.legal_entity = {
          ...updateObj.legal_entity,
          type,
        };
      }
      
      if (city && line1 && postal_code && state) {
        updateObj.legal_entity = {};
        updateObj.legal_entity.address = {
          city,
          line1,
          postal_code,
          state,
        };
      }
      if (personal_id_number) {
        updateObj.legal_entity = {
          ...updateObj.legal_entity,
          personal_id_number,
        };
      }
      console.log(updateObj);
      try {
        const response = await stripe.accounts.update(
          stripeAccountId, 
          updateObj
        );
        res.send({
          success: true,
          message: "saved",
        })
      } catch (err) {
        console.log("err", err);
        return res.send({
          success: false,
          message: `Error: ${err.message}`,
        })
      }
    }
});

router.post("/account/save/account",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const stripeAccountId = req.user.accountId;

    const { stripeTokenId } = req.body;
    console.log(stripeTokenId);

    if (!stripeAccountId) {
      res.send({
        success: true,
        message: "Missing stripe account.",
        setupBegan: false,
        account: null,
      });
    } else if (!stripeTokenId) {
      res.send({
        success: false,
        message: "Missing stripe token.",
        setupBegan: false,
        account: null,
      });
    } else {
      const updateObj = {
        external_account: stripeTokenId,
      };
      try {
        const response = await stripe.accounts.update(
          stripeAccountId, 
          updateObj
        );
        console.log(response);
        res.send({
          success: true,
          message: "saved",
        })
      } catch (err) {
        console.log("err", err);
        return res.send({
          success: false,
          message: `Error: ${err.message}`,
        })
      }
    }
});

router.get("/balance",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const stripe_account = req.user.accountId;
    if (!stripe_account) {
      res.status(200).send({
        success: false,
        balance: null
      });
    } else {
      stripe.balance.retrieve({
        stripe_account,
      }, (err, balance) => {
        if (err) {
          res.status(200).send({
            success: false,
            balance: null
          });
        } else {
          res.status(200).send({
            success: true,
            balance,
          })
        }
      })
    }
});

module.exports = router;