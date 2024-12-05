import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config({ path: '../.env' });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    };

    const { name, email, subject, message } = JSON.parse(event.body);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `rickib Email: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!' }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
        };
    };
};

export { handler };