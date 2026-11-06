import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_APP_PASSWORD
    }
}); 

export const sendVerificationEmail = async(to,code) => {
    await transport.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "verify your email",
        html: `<p>Your verification code is: <b>${code}</b></p><p>This code expires in 10 minutes.</p>`

    });
}