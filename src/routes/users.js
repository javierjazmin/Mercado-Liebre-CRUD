// ************ Require's ************
const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {body} = require('express-validator');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

//***************Validations *********************/
const validations = [
    body('name').notEmpty().withMessage('tienes que poner tu nombre completo'),
    body('email').notEmpty().withMessage('tienes que poner un email valido').bail()
    .isEmail().withMessage('escribir un formato de email valido'),
    body('password').notEmpty().withMessage('tienes que poner una contraseña'),
    body('pais').notEmpty().withMessage('tienes que seleccionar un pais'),
    body('avatar').custom((value, {req}) =>{
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png', '.gif'];

      if(!file){
        throw new Error ('tienes que subir una imagen');
      }
      else{
        let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)){
        throw new Error (`Las extensiones permitidas son ${ acceptedExtensions.join(',') } `);
      }
    }
      return true;

    })
]
//***************Multer *********************/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/users'))
    },
    filename: function (req, file, cb) {
      const newFileName = file.originalname + '-' + Date.now() + path.extname(file.originalname);
      cb(null, newFileName);
    }
  })
  
  const upload = multer({ storage: storage });



/*** Register form ***/ 

router.get('/register', usersController.register);

/**** Proccess Register ****/
router.post('/register', upload.single('avatar'), validations, usersController.procesarRegistro);

module.exports = router;