const HomeController = require('./app/Controllers/HomeController');

module.exports = function(express){
	const router 	= express.Router();


	router.get('/', HomeController.index);
	const kategoriRoutes 	= require('./routes/kategori')(express);
	router.use('/kategori', kategoriRoutes);

	const transaksiRoutes 	= require('./routes/transaksi')(express);
	router.use('/transaksi', transaksiRoutes);

	return router;
};


