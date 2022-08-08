import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import UserService from '../services/UserService';
export function setupPassport() {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      { passwdowrdField: 'password' },
      async (email, password, done) => {
        const user = await UserService.findByEmail(email);
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserService.findById(id);
    done(null, user);
  });
  return passport;
}
