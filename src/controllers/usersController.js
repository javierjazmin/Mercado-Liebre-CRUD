const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function ingresarUsuario(users){
	const dataString = JSON.stringify(users, null, 5);
	fs.writeFileSync(path.join(__dirname, '../data/usersDataBase.json'), dataString)
}

const controller = {

    register: (req,res) => {
        res.render('register');
    },
    procesarRegistro: (req,res) => {
       const resultValidations = validationResult(req);
       if(resultValidations.errors.length > 0){
        return res.render('register', {
            errors: resultValidations.mapped(),
            oldData: req.body});
       }
	    const newUser  = {

			id: users.length + 1,
 			name: req.body.name,
			email: req.body.email,
 			password: req.body.password,
  			pais: req.body.pais,
  			avatar: req.file.filename
		}
		users.push(newUser);
		// Do the magic
		ingresarUsuario(users);
		res.redirect('/')


    }
};

module.exports = controller;