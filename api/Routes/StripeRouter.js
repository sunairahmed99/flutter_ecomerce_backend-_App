import express from "express";
import bodyParser from "body-parser";
import {
  createIntent,
  createCheckoutSession,
  stripeWebhook,
} from "../Controllers/StripeController.js";

const StripeRouter = express.Router();

// Stripe webhook (raw body)
StripeRouter.post("/webhook", bodyParser.raw({ type: "application/json" }), stripeWebhook);

// Mobile payment intent
StripeRouter.post("/create-intent", express.json(), createIntent);

// Web checkout session
StripeRouter.post("/create-checkout-session", express.json(), createCheckoutSession);

export default StripeRouter;
