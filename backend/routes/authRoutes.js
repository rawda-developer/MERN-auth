import connectEnsureLogin from 'connect-ensure-login';
import passport from 'passport';
export const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        success: false,
        message: 'Incorrect username or password.',
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({
        success: true,
        message: 'You have been successfully logged in.',
      });
    });
  })(req, res, next);
};
export const logout = (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.json({
        success: false,
        message: 'Error logging out.',
      });
    }
    return res.json({
      success: true,
      message: 'You have been successfully logged out.',
    });
  });
};
export const isLoggedIn = connectEnsureLogin.ensureLoggedIn('/api/login');
export const isLoggedOut = connectEnsureLogin.ensureLoggedOut('/api/logout');
