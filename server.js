import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './router.js';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'http://localhost:3000';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const publicDirectory = path.join(__dirname, '/');

app.use(express.json());
app.use(express.static(publicDirectory));

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is listening on: ${URL}`);
});