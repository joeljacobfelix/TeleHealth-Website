import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import passport from 'passport';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Start Google OAuth login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/failure',
    session: false, // We’re using JWT, not sessions
  }),
  (req, res) => {
    // Send JWT token to client
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      token: req.user.token,
    });
  }
);



// Failure route

router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Google login failed' });
});

export default router;
