'use strict';

const express = require('express');
const routes = express.Router();
const multer = require('multer');
const path = require('path');
const checkAuthorization = require('../middleware/checkAuthorization');
const AdminController = require('../controllers/AdminController');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        const mimetypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif'];
        if(!mimetypes.includes(file.mimetype)) {
            cb(new Error(`Please upload the correct file`));
        } else {
            cb(null, true);
        }
    }
})



routes.get('/', checkAuthorization, AdminController.home);

routes.get('/car', AdminController.carList);

routes.get('/car/add', AdminController.carAddForm);

routes.post('/car/add', upload.single('photo') ,AdminController.carAddAction);

routes.get('/car/edit/:id', AdminController.carEditForm);

routes.post('/car/edit/:id', upload.single('photo') ,AdminController.carEditAction);

routes.get('/car/delete/:id', AdminController.carDeleteAction);

routes.get('/user', AdminController.userList);

routes.get('/rent', AdminController.rentList);

module.exports = routes;