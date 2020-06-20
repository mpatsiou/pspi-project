const passport = require('passport')
const { Strategy } = require('passport-local');
const { getByUsername } = require('./user')

passport.use(new Strategy(
    async (username, password, done) => {
        const user = await getByUsername(username)

        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        if (user.password != password) {
            return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user)
    }, { session: true }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(async (id, done) => {
    const user = await getById(id)
    done(err, user);
});

module.exports = passport