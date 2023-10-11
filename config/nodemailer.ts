import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  // host: 'smtp.live.com',
  // host: 'smtp.office365.com',
  host: 'smtp-mail.outlook.com',
  service: 'hotmail',
  auth: {
    user: 'chideraemmanuel01@hotmail.com',
    pass: 'Anonymou$1',
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('error configuring nodemailer', error);
  } else {
    console.log('succesfully configured nodemailer', success);
  }
});
