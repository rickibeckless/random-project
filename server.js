import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './router.js';
import emailRouter from './emailRouter.js';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;
const PRO_URL = process.env.PRO_URL || 'http://localhost:3000';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const publicDirectory = path.join(__dirname, '/');

app.use(express.json());
app.use(express.static(publicDirectory));

app.use('/', router);
app.use("/api", emailRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on: ${PRO_URL}`);
});