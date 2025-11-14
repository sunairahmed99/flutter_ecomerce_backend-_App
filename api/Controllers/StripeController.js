import Stripe from "stripe";
import dotenv from "dotenv";
import mailer from "../../Utils/Nodemailer.js";



dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

// =====================
// 📱 MOBILE: Payment Intent (for Flutter Android)
// =====================
export const createIntent = async (req, res) => {
  try {
    const { totalAmount, email, orderNumber } = req.body;

    console.log("📩 [createIntent] Request:", {
      email,
      totalAmount,
      orderNumber,
    });

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ error: "Invalid totalAmount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Stripe accepts cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      metadata: {
        orderNumber: orderNumber || "N/A",
        totalAmount,
      },
    });

    console.log("⚡ [createIntent] PaymentIntent created:", paymentIntent.id);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("❌ [createIntent] Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// =====================
// 🌐 WEB: Stripe Checkout Session
// =====================
export const createCheckoutSession = async (req, res) => {
  try {
    const { totalAmount, email, orderNumber } = req.body;

    console.log("📩 [createCheckoutSession] Request:", {
      email,
      totalAmount,
      orderNumber,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Order #${orderNumber}` },
            unit_amount: Math.round(totalAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/payment/success",
      cancel_url: "http://localhost:5173/payment/failed",
      metadata: {
        orderNumber: orderNumber || "N/A",
        totalAmount,
      },
    });

    console.log("⚡ [createCheckoutSession] Checkout session:", session.id);
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("❌ [createCheckoutSession] Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// =====================
// 🧾 STRIPE WEBHOOK
// =====================
export const stripeWebhook = async (req, res) => {
  console.log("🔔 [stripeWebhook] Received webhook event");

  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("⚡ [stripeWebhook] Event type:", event.type);
  } catch (err) {
    console.error("❌ [stripeWebhook] Signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle successful payments
  if (
    event.type === "payment_intent.succeeded" ||
    event.type === "checkout.session.completed"
  ) {
    const data = event.data.object;

    const email = data.receipt_email || "sunairahmed9908@gmail.com";
    const orderNumber = data.metadata?.orderNumber || "N/A";
    const totalAmount =
      data.amount / 100 || data.amount_total / 100 || 0;
    const date = new Date().toLocaleString();

    try {
      console.log(`[stripeWebhook] Sending success email to: ${email}`);
      await mailer({
        to: email,
        subject: "✅ Payment Confirmation - HK Shop",
        text: `Your payment was successful!\n\n🧾 Order Details:\nOrder #: ${orderNumber}\nAmount: $${totalAmount}\nDate: ${date}\n\nThank you for shopping with us!`,
      });
      console.log("📧 [stripeWebhook] Email sent successfully.");
    } catch (err) {
      console.error("❌ [stripeWebhook] Email sending failed:", err.message);
    }
  } else {
    console.log(`⚠️ [stripeWebhook] Ignored event type: ${event.type}`);
  }

  res.json({ received: true });
};
