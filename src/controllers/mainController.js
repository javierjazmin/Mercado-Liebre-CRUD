const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		dataVisita = products.filter(producto =>{
			return producto.category == "visited"
		})
		dataOfertas = products.filter(producto =>{
			return producto.category == "in-sale"
		})
		
		res.render("index", {ultimaVisita: dataVisita, ofertas: dataOfertas});
		// Do the magic
	},
	search: (req, res) => {
		// Do the magic
	},
	
};

module.exports = controller;
