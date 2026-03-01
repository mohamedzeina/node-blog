const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      const redirect = ['production', 'ci'].includes(process.env.NODE_ENV)
        ? '/blogs'
        : 'http://localhost:3000/blogs';
      res.redirect(redirect);
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    const redirect = ['production', 'ci'].includes(process.env.NODE_ENV)
      ? '/'
      : 'http://localhost:3000';
    res.redirect(redirect);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
