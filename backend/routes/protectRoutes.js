// routes/protectedRoute.js
import express from 'express';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/admin-only', protect, authorizeRoles('admin'), (req, res) => {
  res.send('Welcome Admin!');
});

router.get('/doctor-area', protect, authorizeRoles('doctor', 'admin'), (req, res) => {
  res.send('Doctor Dashboard');
});

export default router;
