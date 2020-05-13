const Transaksi  = require('../Models/Transaksi.js');

class TransaksiRepository {
	constructor () {
		this.model = new Transaksi;
	}

	insert (req) {
		const transaksi = new Transaksi({
			kategori_id 	: req.kategori_id,
			nominal 		: req.nominal,
		    deskripsi 		: req.deskripsi,
		    created_at		: new Date
		});

		transaksi.save((err, rows) => {
		 	if (err) throw err;
		});
	}

	update (req) {
		const transaksi = new Transaksi({
			kategori_id 	: req.kategori_id,
			nominal 		: req.nominal,
		    deskripsi 		: req.deskripsi,
		    updated_at		: new Date
		});

		transaksi.set('id',  req.id);

		transaksi.save((err, rows) => {
		 	if (err) throw err;
		});
	}

	delete (req) {
		const transaksi = new Transaksi({
			deleted_at	: new Date
		});

		transaksi.set('id',  req.id);

		transaksi.save((err, rows) => {
		 	if (err) throw err;
		});
	}

	getDataByDate (start, end, start_data, limit) {
		return new Promise((resolve, reject) => {
			const query = `SELECT a.id AS id,
								a.kategori_id AS kategori_id,
								b.jenis_id AS jenis_id,
								c.nama AS jenis_transaksi,
								b.nama AS kategori,
								nominal,
								deskripsi
							FROM transaksi a
							JOIN kategori b ON a.kategori_id = b.id
							JOIN jenis c ON b.jenis_id = c.id
							WHERE (a.created_at BETWEEN TIMESTAMP('${start}') AND TIMESTAMP('${end}'))
								AND a.deleted_at IS null
							LIMIT ${start_data}, ${limit}`;

			this.model.query(query, (err, result, fields) => {
				if (err) throw err;

				resolve(result);
			});
		}); 
	}

	getCountDataByDate (start, end) {
		return new Promise((resolve, reject) => {
			const query = `SELECT COUNT(*) as count
							FROM transaksi a
							JOIN kategori b ON a.kategori_id = b.id
							JOIN jenis c ON b.jenis_id = c.id
							WHERE (a.created_at BETWEEN TIMESTAMP('${start}') AND TIMESTAMP('${end}'))
								AND a.deleted_at IS null`;

			this.model.query(query, (err, result, fields) => {
				if (err) throw err;

				resolve(parseInt(result[0].count));
			});
		}); 
	}

	getSingle (id) {
		return new Promise((resolve, reject) => {
			this.model.find('first', {where: `id=${id} AND deleted_at IS NULL`}, function(err, result, fields) {
				if (err) throw err;

				resolve(result);
			});
		}); 
	}

	getSumPemasukanPengeluaran () {
		return new Promise((resolve, reject) => {
			const query = `SELECT 
    						SUM(IF(jenis_id = 1, nominal, 0)) AS pemasukan,
    						SUM(IF(jenis_id = 2, nominal, 0)) AS pengeluaran
						FROM transaksi a
						JOIN kategori b ON a.kategori_id = b.id
						JOIN jenis c ON b.jenis_id = c.id
						WHERE a.deleted_at IS null`;

			this.model.query(query, (err, result, fields) => {
				if (err) throw err;

				resolve(result[0]);
			});
		}); 
	}
}

module.exports = new TransaksiRepository;