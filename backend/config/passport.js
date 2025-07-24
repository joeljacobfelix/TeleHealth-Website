import dotenv from 'dotenv';

dotenv.config();

import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/User.js';
import generateToken from '../utils/jwtUtils.js';

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        const doctorEmails = ['doctor@example.com'];
        const adminEmails = ['admin@example.com'];

        const user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: '',
          role: adminEmails.includes(profile.emails[0].value)
            ? 'admin'
            : doctorEmails.includes(profile.emails[0].value)
            ? 'doctor'
            : 'patient',
        });

        // Attach JWT to user object
        const token = generateToken(user._id);
        user.token = token;

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
