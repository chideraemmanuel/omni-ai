import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: '',
  auth: {
    user: '',
    pass: '',
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('error configuring nodemailer', error);
  } else {
    console.log('succesfully configured nodemailer', success);
  }
});
