const db = require("../models");
const Users = db.users
const router = require("express").Router();
const express = require('express')
const auth = require('../middleware/auth')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = process.env.SERVER_DOMAIN

module.exports = app => {

app.get('/subscribe', auth, async (req, res, next) => {
    try {
        const user = req.user
        const customer = () => {
          if (req.user.customerId) return {customer: req.user.customerId}
          return {customer_email: user.email}
        }
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
            {
                price: 'price_1MGfCyAuQHpJclANfKFbfZzl',
                quantity: 1,
            },
            ],
            subscription_data: {metadata: {userId: req.session.userId}},
            mode: 'subscription',
            success_url: `${YOUR_DOMAIN}?signup=success`,
            cancel_url: `${YOUR_DOMAIN}`,
            ...customer()
        });
    
        res.redirect(303, session.url);
    } catch(err) {
      next(err)
    }
});

app.get('/manage-subscription', auth, async (req, res, next) => {
  try {
    const returnUrl = YOUR_DOMAIN;
  
    const user = req.user
  
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.customerId,
      return_url: returnUrl,
    });
  
    res.redirect(303, portalSession.url);
  } catch(err) {
    next(err)
  }
});


app.post('/1gFhBs3OpwzX54vM', express.raw({ type: 'application/json' }), async (request, response, next) => {
  try {
    let event = request.rawBody;
    const endpointSecret = 'whsec_0z5jjpQluG4OijqCdwfS5Jusp7Uk2wiG';
    if (endpointSecret) {
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    const userUpdate = async (data) => {
      const subscription = event.data.object;
      const user = await Users.findByPk(subscription.metadata.userId)
      await user.update(data)
    }
    switch (event.type) {
      case 'customer.subscription.deleted':
        await userUpdate({status: 2})
        break;
      case 'customer.subscription.created':
        await userUpdate({status: 1, customerId: event.data.object.customer})
        break;
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  } catch(err) {
    next(err)
  }
});
    app.use('/', router);
};