import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { publicDirectory } from './server.js';
import nodemailer from 'nodemailer';

dotenv.config({ path: './.env' });
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'index.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'pages/about.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'pages/contact.html'));
});

router.get('/random-project', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'pages/random-project.html'));
});

router.get('/current-dos', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'pages/current-dos.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'pages/404.html'));
});

router.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `rickib Email: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        replyTo: email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send('Internal server error');
        } else {
            res.status(200).send('Email sent');
        };
    });
});

export default router;