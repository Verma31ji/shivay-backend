import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { getAdminData } from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/data', adminAuth, getAdminData);

export default adminRouter;
