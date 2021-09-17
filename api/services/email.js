const nodemailer = require('nodemailer');

exports.sendVerificationEmail = async (email, username, verificationCode) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const header = '<h1>Title</h1><br>';
  const body = '<p>Please visit the following link to verify your email address: ';
  const link = `${process.env.API_URL}/api/verify/${username}/${verificationCode}`;
  const footer = '<br>footer text</p>';

  const message = {
    to: email,
    from: process.env.NODEMAILER_USER,
    subject: 'Please verify your email address.',
    text: `Please visit the following link to verify your email address: ${link}`,
    html: `${header}${body}${link}${footer}`,
  };

  await transporter.sendMail(message);
};
