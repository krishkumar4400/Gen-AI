import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: process.env.GOOGGLE_USER,
    clientId: process.env.GOOGGLE_CLIENT_ID,
    clientSecret: process.env.GOOGGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGGLE_REFRESH_TOKEN,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Email tarnsporter is ready to send emails");
  })
  .catch((error) => {
    console.log("Email transporter verification failed");
    console.log(error);
  });

async function sendMail({ to, subject, html }) {
  const mailOptions = {
    from: process.env.GOOGGLE_USER,
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(info);
  return "Email sent successfully" + to;
}

export default sendMail;
