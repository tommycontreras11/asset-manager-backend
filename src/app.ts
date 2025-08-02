import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import routers from './routers'

const app = express()

app.use(morgan('dev'))
const allowedOrigins = [
  'http://localhost:3001',
  'https://asset-manager-frontend-e9gg.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())
app.use(routers)

export default app