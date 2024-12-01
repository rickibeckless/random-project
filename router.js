import express from 'express';
import path from 'path';
import { publicDirectory } from './server.js';

const router = express.Router();

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

router.get('*', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'pages/404.html'));
});

export default router;