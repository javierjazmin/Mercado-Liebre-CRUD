// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); 

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
//***************Multer *********************/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/products'))
    },
    filename: function (req, file, cb) {
      const newFileName = file.originalname + '-' + Date.now() + path.extname(file.originalname);
      cb(null, newFileName);
    }
  })
  
  const upload = multer({ storage: storage })

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', upload.single('image'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
