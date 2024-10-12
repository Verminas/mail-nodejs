import express from 'express';
import nodemailer from 'nodemailer';
import {authInfo} from "./authInfo";

const app = express();
const PORT = process.env.PORT || 5000;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: authInfo.user,
    // this pass - from app password in google account
    pass: authInfo.pass,
  },
});

app.get('/', (req, res) => {
  res.send('Hello from mail server')
})

app.get('/sendMessage', async (req, res) => {

  const mailOptions = {
    from: `"Mail-nodejs" <${authInfo.user}>`, // sender address
    to: authInfo.toUsers, // list of receivers
    subject: "Test mail server ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `<b>Hello from new nodejs server</b>`, // html body
  }

  const info = await transporter.sendMail(mailOptions)

  res.send(`message sent successfully`)
})

app.listen(PORT, () => {
  console.log(`server listening port ${PORT}, http://localhost:${PORT}`)
})
