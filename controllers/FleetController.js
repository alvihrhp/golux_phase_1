'use strict';
const Car = require('../models').Car;
const Rent = require('../models').Rent;

class FleetController {
    static getList(req, res) {
         res.render('fleet', {session: req.session.user})
    }

    static getSedanCar(req, res) {
        Car.findAll({where: {type: 'sedan'}, order: [['id', 'ASC']]})
            .then(cars => {
                res.render('sedanFleet', {cars, session: req.session.user});
            })
            .catch(error => {
                res.send(error);
            })
    }

    static getSuvCar(req, res) {
        Car.findAll({where: {type: 'suv'}, order: [['id', 'ASC']]})
            .then(cars => {
                res.render('suvFleet', {cars, session: req.session.user});
            })
            .catch(error => {
                res.send(error);
            })
    }

    static getSportsCar(req, res) {
        Car.findAll({where: {type: 'sport'}, order: [['id', 'ASC']]})
            .then(cars => {
                res.render('sportFleet', {cars, session: req.session.user});
            })
            .catch(error => {
                res.send(error);
            })
    }

    static getMinibus(req, res) {
        Car.findAll({where: {type: 'minibus'}, order: [['id', 'ASC']]})
            .then(cars => {
                res.render('minibusFleet', {cars, session: req.session.user})
            })
            .catch(error => {
                res.send(error);
            })
    }

    static detail(req, res) {
        Car.findByPk(Number(req.params.id))
            .then(car => {
                car.setStatus(car.isRented);
                res.render('fleetDetail', {car: car.dataValues, session: req.session.user})
            })
            .catch(error => {
                res.send(error);
            })
    }
    
    static bookForm(req, res) {
        Car.findByPk(Number(req.params.id))
            .then(car => {
                res.render('booking', {session: req.session.user});
            })
            .catch(error => {
                res.send(error );
            })
    }

    static bookAction(req, res) {
        let inputRents = {
            UserId: req.session.user.id,
            CarId: Number(req.params.id),
            startAt: new Date(req.body.startAt).toISOString(),
            endAt: new Date(req.body.endAt).toISOString()
        }
        Rent.create(inputRents)
            .then(_ => {
                let updateIsRented = {
                    isRented: true
                }
                return Car.update(updateIsRented, {where: {id: Number(req.params.id)}})
            })
            .then(_ => {
                res.redirect('/');
            })
            .catch(error => {
                res.send(error);
            })
    }
}

module.exports = FleetController;