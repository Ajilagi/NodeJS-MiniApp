const fs = require('fs');
const transaksiRepository  = require('../Repositories/TransaksiRepository.js');

exports.index = async function(req, res) {
    result = await transaksiRepository.getSumPemasukanPengeluaran();

	res.render('home', {
		data 			: result
	});
};