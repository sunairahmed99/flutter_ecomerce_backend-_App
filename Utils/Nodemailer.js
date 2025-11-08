import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:process.env.Gmail_User,         
    pass:process.env.Gmail_Pass,                   
  },
});


const mailer = async ({ to, subject, text }) => {
  const mailOptions = {
    from: 'sunairahmed9908@gmail.com',         
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Error sending email:', error);
        reject(error);
      } else {
        console.log('✅ Email sent:', info.response);
        resolve(info);
      }
    });
  });
};

// ✅ Export with a different name if you want
export default mailer; // or export { mailer } if not default
