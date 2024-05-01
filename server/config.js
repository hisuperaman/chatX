import dotenv from 'dotenv';

dotenv.config();

export const config = {
    clientURL: process.env.CLIENT_URL,
    // clientURL: 'http://localhost:3000'
}