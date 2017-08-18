'use strict';
module.exports = function (app) {

    let passport = require('passport');
    let LocalStrategy = require('passport-local').Strategy;
    let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    let GoogleContacts = require('google-contacts').GoogleContacts;
    let FacebookStrategy = require('passport-facebook').Strategy;
    let mongoose = require("mongoose");

    let userModel = require("../model/user/user.model.server.js");

    let auth = authorized;
    app.post('/api/project/login', passport.authenticate('local'), login);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    app.post('/api/project/user', auth, adminCreateUser);
    app.get('/api/project/loggedin', loggedin);
    app.get('/api/project/user', auth, adminFindAllUsers);
    app.put('/api/project/user/:id', auth, updateUser);
    app.delete('/api/project/user/:id', auth, adminDeleteUser);

    //TODO remove later
    app.get('/api/project/giveChef', (req, res) => {
        userModel.getMongooseModel().update({_id: req.user._id}, {$push: {roles: "CHEF"}}).then(() => {
            res.sendStatus(200);
            res.end();
        });
    });

    //TODO remove later
    app.get('/api/project/giveAdmin', (req, res) => {
        userModel.getMongooseModel().update({_id: req.user._id}, {$push: {roles: "ADMIN"}}).then(() => {
            res.sendStatus(200);
            res.end();
        });
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#!/profile',
            failureRedirect: '/project/#!/login'
        }));

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email', 'https://www.googleapis.com/auth/contacts.readonly']}));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#!/profile',
            failureRedirect: '/project/#!/login'
        }));

    let keyStore = {};

    try {
        keyStore = require("../../env.vars.local");
    } catch (e) {
        if (process.env.GOOGLE_CLIENT_ID) {
            keyStore = process.env;
        } else {

            keyStore.GOOGLE_CLIENT_ID = "none";
            keyStore.GOOGLE_CLIENT_SECRET = "none";
            keyStore.GOOGLE_CALLBACK_URL = "none";

            keyStore.FACEBOOK_CLIENT_ID = "none";
            keyStore.FACEBOOK_CLIENT_SECRET = "none";
            keyStore.FACEBOOK_CALLBACK_URL = "none";
        }
    }

    let googleConfig = {
        clientID: keyStore.GOOGLE_CLIENT_ID,
        clientSecret: keyStore.GOOGLE_CLIENT_SECRET,
        callbackURL: keyStore.GOOGLE_CALLBACK_URL
    };

    let facebookConfig = {
        clientID: keyStore.FACEBOOK_CLIENT_ID,
        clientSecret: keyStore.FACEBOOK_CLIENT_SECRET,
        callbackURL: keyStore.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        let names = profile.displayName.split(" ");
                        let newFacebookUser = {
                            username: names[0] + names[1],
                            lastName: names[1],
                            firstName: names[0],
                            email: profile.emails ? profile.emails[0].value : "",
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };

                        let createUsername = (num) => {
                            console.log(num);
                            return userModel.findUserByUsername(newFacebookUser.username + num).then(user => {
                                if (!user) {
                                    newFacebookUser.username = newFacebookUser.username + num;
                                    return userModel.createUser(newFacebookUser);
                                } else {
                                    return createUsername(num + 1);
                                }
                            }, err => {
                                newFacebookUser.username = newFacebookUser.username + num;
                                return userModel.createUser(newFacebookUser);
                            })
                        };

                        return userModel.findUserByUsername(newFacebookUser.username).then(user => {
                            console.log(user);
                            if (!user) {
                                return userModel.createUser(newFacebookUser);
                            } else {
                                return createUsername(0);
                            }
                        }, err => {
                            console.log(err);
                            return userModel.createUser(newFacebookUser);

                        });
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        let newGoogleUser = {
                            username: profile.name.givenName + profile.name.familyName,
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id: profile.id,
                                token: token
                            }
                        };

                        let createUsername = (num) => {
                            console.log(num);
                            return userModel.findUserByUsername(newGoogleUser.username + num).then(user => {
                                if (!user) {
                                    newGoogleUser.username = newGoogleUser.username + num;
                                    return userModel.createUser(newGoogleUser);
                                } else {
                                    return createUsername(num + 1);
                                }
                            }, err => {
                                newGoogleUser.username = newGoogleUser.username + num;
                                return userModel.createUser(newGoogleUser);
                            })
                        };

                        return userModel.findUserByUsername(newGoogleUser.username).then(user => {
                            console.log(user);
                            if (!user) {
                                return userModel.createUser(newGoogleUser);
                            } else {
                                return createUsername(0);
                            }
                        }, err => {
                            console.log(err);
                            return userModel.createUser(newGoogleUser);

                        });

                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    console.log(user);
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    console.log(err);
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        let user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        console.log("logging out");
        req.logOut();
        res.sendStatus(200);
    }

    function register(req, res) {
        let newUser = req.body;
        newUser.roles = ['REGULAR'];
        console.log(req.body);

        userModel.findUserByUsername(newUser.username).then(function (user) {
                console.log("found user: " + user);
                if (!user) {
                    console.log("no user found");
                    return userModel.createUser({
                        username: newUser.username,
                        password: newUser.password,
                        email: newUser.email,
                        roles: newUser.roles
                    }).then(function (user) {
                            console.log("logging user in");
                            if (user) {
                                req.login(user, function (err) {
                                    if (err) {
                                        res.status(400).send(err);
                                    } else {
                                        res.json(user);
                                    }
                                });
                            }
                        },
                        function (err) {
                            console.log("sending error");
                            console.log(err);
                            res.status(400).send(err);
                        }
                    );
                } else {
                    console.log("User Found");
                    res.status(400).send("User of given username already exists").end();
                }
            },
            function (err) {
                return userModel.createUser({
                    username: newUser.username,
                    password: newUser.password,
                    roles: newUser.roles
                }).then(function (user) {
                        if (user) {
                            req.login(user, function (err) {
                                if (err) {
                                    res.status(400).send(err);
                                } else {
                                    res.json(user);
                                }
                            });
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
            }
        )
    }

    function adminFindAllUsers(req, res) {
        if (isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function adminDeleteUser(req, res) {
        if (isAdmin(req.user)) {
            userModel
                .removeUser(req.params.id)
                .then(
                    function (user) {
                        return userModel.findAllUsers();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function updateUser(req, res) {
        let newUser = req.body;
        console.log(req.user);
        if (!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if (typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function (user) {
                    return userModel.findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function adminCreateUser(req, res) {
        if (isAdmin(req.user)) {
            let newUser = req.body;

            // first check if a user already exists with the username
            userModel
                .findUserByUsername(newUser.username)
                .then(
                    function (user) {
                        // if the user does not already exist
                        if (user == null) {
                            // create a new user
                            return userModel.createUser(newUser)
                                .then(
                                    // fetch all the users
                                    function () {
                                        return userModel.findAllUsers();
                                    },
                                    function (err) {
                                        res.status(400).send(err);
                                    }
                                );
                            // if the user already exists, then just fetch all the users
                        } else {
                            return userModel.findAllUsers();
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                )
        } else {
            res.status(403);
        }
    }

    function findAllUsers(req, res) {
        if (isAdmin(req.user)) {
            userModel.findAllUsers().then(data => res.json(data));
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        return user.roles.indexOf("ADMIN") > 0;

    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
};