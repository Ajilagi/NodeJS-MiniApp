const kategoriRepository   = require('../Repositories/KategoriRepository.js');

exports.index = async function(req, res) {
	const data = await kategoriRepository.getIndexData(req.query);

    res.render('kategori', {
    	query: req.query,
    	data : data
    });
};

exports.create = function(req, res) {
    kategoriRepository.insert(req.body);

	res.redirect('/kategori');
};

exports.update = function(req, res) {
 	kategoriRepository.update(req.body);

	res.redirect('/kategori');
};

exports.delete = function(req, res) {
 	kategoriRepository.delete(req.body);

	res.redirect('/kategori');
};