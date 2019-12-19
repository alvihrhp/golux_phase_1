'use strict';

const User = require('../models').User;
const checkPassword = require('../helper/checkPassword');
const Car = require('../models').Car;

class HomeController {
    static getHome(req, res) {
        res.render('index', {session: req.session.user});
    }

    static registerForm(req, res) {
        res.render('register', {session: req.session.user})
    }

    static registerAction(req, res) {
        let inputCreate = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            role: 'Customer',
            birth_year: req.body.birth_year
        }
        User.create(inputCreate)
            .then(_ => {
                res.redirect('/');
            })
            .catch(error => {
                res.send(error);
            })
    }

    static loginForm(req, res) {
        res.render('login', {session: req.session.user})
    }

    static loginAction(req, res) {
        let userData = null
        User.findOne({where: {email: req.body.email}})
            .then(user => {
                userData = user;
                return checkPassword(req.body.password, user.password);
            })
            .then(flag => {
                if(flag === false) {
                    throw new Error(`Username/Password doesn't exists`)
                } else {
                    req.session.user = {
                        id: userData.id,
                        role: userData.role,
                    }
                    res.redirect('/')
                }
            })
            .catch(error => {
                res.send(error.message);
            })
    }

    static profile(req, res) {
        User.findByPk(Number(req.session.user.id), {include: Car})
            .then(user => {
                let count = 1;
                // res.send(user);
                res.render('profile', {user, session: req.session.user, count});
            })
            .catch(error => {
                res.send(error);
            })
    }

    static logoutAction(req, res) {
        req.session.destroy((err) => {
            if(err) {
                res.send(err);
            } else {
                res.redirect('/')
            }
        })
    }

    static contact(req, res) {
        res.render('contact', {session: req.session.user});
    }
}

module.exports = HomeController;