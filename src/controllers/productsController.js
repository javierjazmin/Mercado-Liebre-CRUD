const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function storeProduct(products){
	const dataString = JSON.stringify(products, null, 5);
	fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), dataString)
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", {data: products});
		// Do the magic
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const productoEncontrado = products.find(producto => {
			return producto.id == req.params.id
		})
		
		res.render("detail", { data: productoEncontrado});
		// Do the magic
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form");

		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const newProduct = {

			id: products.length + 1,
 			name: req.body.name,
			price: req.body.price,
 			discount: req.body.discount,
  			category: req.body.category,
  			description: req.body.description,
  			image: null
		}
		products.push(newProduct);
		// Do the magic
		storeProduct(products);
		res.redirect('/products/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const productoAEditar = products.find(producto =>{
			return producto.id == req.params.id;
		});
		
		
		res.render("product-edit-form", {producto: productoAEditar});
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		const productoAEditar = products.find(producto =>{
			return producto.id == req.params.id;
		});

		productoAEditar.name = req.body.name;
		productoAEditar.price = req.body.price;
		productoAEditar.discount = req.body.discount;
		productoAEditar.description = req.body.description;
		productoAEditar.category = req.body.category;

		storeProduct(products);

		res.redirect("/products/edit/" + productoAEditar.id);

		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const productoEncontrado = products.findIndex(producto => {
			return producto.id == req.params.id
		})
		products.splice(productoEncontrado, 1);

		storeProduct(products);

		res.redirect('/products');
		// Do the magic
	}
};

module.exports = controller;