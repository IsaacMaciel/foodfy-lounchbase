const nodemailer = require('nodemailer');

nodemailer.createTransport
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "60a9ddf714020d",
      pass: "4d9a6c24f73026"
    }
  });

  module.exports = transport;