import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  // host: 'smtp.live.com',
  // host: 'smtp.office365.com',
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL!,
    pass: process.env.AUTH_PASS!,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('error configuring nodemailer', error);
  } else {
    console.log('succesfully configured nodemailer', success);
  }
});
