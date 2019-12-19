'use strict';

const Car = require('../models').Car;
const User = require('../models').User;
const Rent = require('../models').Rent;

class AdminController {
    static home(req, res) {
        res.render('adminHome');
    }

    static carList(req, res) {
        Car.findAll({order: [['id', 'ASC']]})
            .then(cars => {
                res.render('carList', {cars})
            })
            .catch(error => {
                res.send(error);
            })
    }

    static carAddForm(req, res) {
        res.render('carAdd');
    }

    static carAddAction(req, res) {
        let path = req.file ? req.file.path : "public/uploads/noimage.jpg"
        const inputCar = {
            name: req.body.name || "No name",
            brand: req.body.brand || "No brand",
            pricePerDay: req.body.pricePerDay || 0,
            type: req.body.type || "No type",
            isRented: false,
            path_picture: path,
            description: req.body.description,
            video: req.body.video
        }
        Car.create(inputCar)
            .then(_ => {
                res.redirect('/admin/car');
            })
            .catch(error => {
                res.send(error);
            })
    }

    static carEditForm(req, res) {
        Car.findByPk(Number(req.params.id))
            .then(car => {
                res.render('carEdit', {car});
            })
            .catch(error => {
                res.send(error);
            })
    }

    static carEditAction(req, res) {
        let inputUpdate = {};
        for(let key in req.body) {
            if(req.body[key].length > 0) {
                inputUpdate[key] = req.body[key];
            }
        }
        if(req.file && req.file.path) {
            inputUpdate['path_picture'] = req.file.path.split('/')[2];
        }
        Car.update(inputUpdate, {where: {id: Number(req.params.id)}})
            .then(_ => {
                res.redirect('/admin/car');
            })
            .catch(error => {
                res.send(error);
            })
    }

    static carDeleteAction(req, res) {
        Car.destroy({where: {id: Number(req.params.id)}})
            .then(_ => {
                res.redirect('/admin/car');
            })
            .catch(error => {
                res.send(error);
            })
    }

    static userList(req, res) {
        User.findAll({order: [['id', 'ASC']]})
            .then(users => {
                res.render('userList', {users})
            })
            .catch(error => {
                res.send(error);
            })
    }

    static rentList(req, res) {
        Rent.findAll({order: [['id', 'ASC']]})
            .then(rents => {
                res.render('rentList', {rents})
            })
            .catch(error => {
                res.send(error);
            })
    }
}

module.exports = AdminController;