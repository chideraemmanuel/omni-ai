import { transporter } from '@/config/nodemailer';

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const sendEmail = (mailOptions: MailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('failed to send mail', error);
    } else {
      console.log('Mail sent!', info.messageId);
    }
  });
};
