const moment 	 = require('moment');

const kategoriRepository   = require('../Repositories/KategoriRepository.js');
const transaksiRepository  = require('../Repositories/TransaksiRepository.js');

exports.index = async function(req, res) {
	kategori_rows 		 = await kategoriRepository.getAll();
	kategori_pemasukan 	 = [];
	kategori_pengeluaran = [];

	kategori_rows.forEach( function(value, index) {
		if (value.jenis_id == 1) 
			kategori_pemasukan.push(value);
		else if(value.jenis_id == 2)
			kategori_pengeluaran.push(value)
	});

	res.render('transaksi', {
		start 				: moment().startOf('month').format("DD/MM/YYYY"),
		end 				: moment().endOf('month').format("DD/MM/YYYY"),
		kategori 			: kategori_rows,
		kategori_pemasukan 	: kategori_pemasukan,
		kategori_pengeluaran: kategori_pengeluaran
	});
};

exports.getDataIndexTable = async function(req, res) {
	if (req.query.start_date == undefined) var start = moment().startOf('month').format('YYYY-MM-DD hh:mm:ss');
	else var start = moment(req.query.start_date, "DD/MM/YYYY").format("YYYY-MM-DD 00:00:00");

	if (req.query.end_date == undefined) var end = moment().endOf('month').format('YYYY-MM-DD hh:mm:ss');
	else var end = moment(req.query.end_date, "DD/MM/YYYY").format("YYYY-MM-DD 23:59:59");

	count_transaksi_rows  = await transaksiRepository.getCountDataByDate(start, end);
	transaksi_rows  	  = await transaksiRepository.getDataByDate(start, end, req.query.start, req.query.length);

	transaksi_rows.forEach(function(value, key) {
		value.no 			= key+1;
		value.nominal_txt 	= 'Rp.'+ new Intl.NumberFormat(['ban', 'id']).format(value.nominal);
		value.aksi 			= `
			<button type="button" class="btn btn-warning edit" data-id="${value.id}">Edit</button>
      		<button type="button" class="btn btn-danger delete" data-id="${value.id}">Delete</button>`
	});

    res.json({
    	recordsTotal	: count_transaksi_rows,
    	recordsFiltered	: count_transaksi_rows,
    	data 			: transaksi_rows
    });
};

exports.getSingle = async function(req, res) {
	data  = await transaksiRepository.getSingle(req.query.id);

    res.json(data);
};

exports.create = function(req, res) {
    transaksiRepository.insert(req.body);

	res.redirect('/transaksi');
};

exports.update = function(req, res) {
    transaksiRepository.update(req.body);

	res.redirect('/transaksi');
};

exports.delete = function(req, res) {
 	transaksiRepository.delete(req.body);

	res.redirect('/transaksi');
};