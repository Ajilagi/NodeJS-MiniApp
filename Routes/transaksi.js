const TransaksiController = require('../app/Controllers/TransaksiController');

module.exports = function(express){
	const router 	= express.Router();

	router.get('/', TransaksiController.index);
	router.get('/get-data-index-table', TransaksiController.getDataIndexTable);
	router.get('/get-single', TransaksiController.getSingle);
	router.post('/', TransaksiController.create);
	router.post('/update', TransaksiController.update);
	router.post('/delete', TransaksiController.delete);

	return router;
};
