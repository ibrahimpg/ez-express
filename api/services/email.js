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

exports.sendRecoveryEmail = async (email, temporaryPassword) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const header = '<h1>Your password has been reset.</h1><br>';
  const body = `<p>Use the following password to sign in to your account: ${temporaryPassword}`;
  const footer = '<br>Once you have logged in, please change to a secure password.</p>';

  const message = {
    to: email,
    from: process.env.NODEMAILER_USER,
    subject: 'Your password has been reset.',
    text: `Use the following to sign in and please update your password immediately: ${temporaryPassword}`,
    html: `${header}${body}${footer}`,
  };

  await transporter.sendMail(message);
};
