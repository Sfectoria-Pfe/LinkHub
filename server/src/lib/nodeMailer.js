const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const UserOTPVerification = require("../models/UerOTPVerification");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "yassinedebich214@gmail.com",
    pass: "ubys bnok ansx abpv",
  },
});

const sendConfirmationEmail = async (email, activationCode) => {
  transporter
    .sendMail({
      from: "yassinedebich214@gmail.com",
      to: email,
      subject: "Activation code",
      html: `
    <h1>Activation code</h1>
    <h2>Bonjour</h2>
    <p>pour activer votre compte , veuillez cliquer sur ce lien</p>
    <a href="http://localhost:5173/confirm/${activationCode}">activer</a>
    </div>
    `,
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { transporter, sendConfirmationEmail };
