import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongoDb.js';

import authRouter from './Route/authRoutes.js';
import adminRouter from './Route/adminRoutes.js';
import postRouter from './controller/PostController.js';
import UserRouter from './Route/UserRoutes.js';
import contactQuery from './Route/contactQueryRoute.js';




const app = express();
const port = process.env.PORT || 5500;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
}));

app.get('/', (req, res) => res.send('API Working'));

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api', postRouter);
app.use('/api/user', UserRouter);
app.use('/api/query', contactQuery);



const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server started on PORT :${port}`);
    });
};

startServer();
