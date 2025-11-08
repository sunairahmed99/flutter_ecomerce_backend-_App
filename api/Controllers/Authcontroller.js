import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "node-fetch";
import Userss from "../Models/UserSchema.js";



dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  try {

    console.log("pillayy")
    const { id_token, access_token } = req.body;
    const token = id_token || access_token;
    if (!token) return res.status(400).json({ message: "No token provided" });

    let payload;

    if (token.split(".").length === 3) {
      // ✅ ID Token verification
      const ticket = await client.verifyIdToken({
  idToken: token,
  audience: [process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_ID_MOBILE], // <- array of allowed client IDs
});
      payload = ticket.getPayload();
    } else {
      // ✅ Access Token verification
      const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!userInfoRes.ok) throw new Error("Invalid access token");
      payload = await userInfoRes.json();
    }

    const { sub, email, name } = payload;

    let user = await Userss.findOne({ email });
    if (!user) {
      user = new Userss({
        name,
        email,
        phone: null,
        googleId: sub,
        googleloggedin: true,
      });
      await user.save();
    }

    const userJwt = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.jwt_key,
      { expiresIn: process.env.jwt_exp || "1h" }
    );

    res.status(200).json({
      status: "success",
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: null,
      },
      token: userJwt,
    });

  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: "fail",
      message: "Invalid Google token",
      error: err.message,
    });
  }
};






export { googleLogin};
