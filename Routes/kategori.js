const KategoriController = require('../app/Controllers/KategoriController');

module.exports = function(express){
	const router 	= express.Router();

	router.get('/', KategoriController.index);
	router.post('/', KategoriController.create);
	router.post('/update', KategoriController.update);
	router.post('/delete', KategoriController.delete);

	return router;
};