const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

    register: (req,res) => {
        res.render('register');
    },
    procesarRegistro: (req,res) => {
       const resultValidations = validationResult(req);
       if(resultValidations.errors.length > 0){
        return res.render('register', {errors: resultValidations.mapped()});
       }
       

    }
};

module.exports = controller;