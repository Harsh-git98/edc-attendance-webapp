// const express = require('express');
// const passport = require('passport');
// const session = require('express-session');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const app = express();

// app.set('view engine', 'ejs');
// app.use(express.static('public'));


// module.exports = function(app) {
//     // Express Session Middleware
// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// // Passport Config
// passport.use(new GoogleStrategy({
//     clientID: 'YOUR_GOOGLE_CLIENT_ID',
//     clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
//     callbackURL: '/auth/google/callback'
// }, (accessToken, refreshToken, profile, done) => {
//     return done(null, profile);
// }));

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// // Routes
// app.get('/', (req, res) => {
//     res.render('login');
// });

// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile'] })
// );

// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => {
//         res.redirect('/todo');
//     }
// );

// app.get('/todo', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.render('todo', { user: req.user });
//     } else {
//         res.redirect('/');
//     }
// });



// };



const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(app) {

    // Passport Config
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    // Routes
    app.get('/', (req, res) => {
        res.render('login');
    });

    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile'] })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        (req, res) => {
            res.redirect('/todo');
        }
    );

    app.get('/todo', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('todo', { user: req.user });
        } else {
            res.redirect('/');
        }
    });

    app.get('/logout', (req, res) => {
        req.logout(err => {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });
};
