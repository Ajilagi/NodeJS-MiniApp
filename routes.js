const HomeController 	 			= require('./app/Controllers/HomeController');
const TransaksiController 			= require('./app/Controllers/TransaksiController');
const KategoriController 			= require('./app/Controllers/KategoriController');

module.exports = function(express){
	const router 	= express.Router();

	router.get('/', HomeController.index);

	router.get('/kategori', KategoriController.index);
	router.post('/kategori', KategoriController.create);
	router.post('/kategori/update', KategoriController.update);
	router.post('/kategori/delete', KategoriController.delete);

	router.get('/transaksi', TransaksiController.index);
	router.get('/transaksi/get-data-index-table', TransaksiController.getDataIndexTable);
	router.get('/transaksi/get-single', TransaksiController.getSingle);
	router.post('/transaksi', TransaksiController.create);
	router.post('/transaksi/update', TransaksiController.update);
	router.post('/transaksi/delete', TransaksiController.delete);

	return router;
};


