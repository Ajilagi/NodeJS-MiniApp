const Kategori  = require('../Models/Kategori.js');

class KategoriRepository {
	constructor () {
		this.model = new Kategori;
	}

	insert (req) {
		const kategori = new Kategori({
			jenis_id	: req.jenis_id,
		    nama 		: req.nama,
		    created_at	: new Date
		});

		kategori.save((err, rows) => {
		 	if (err) throw err;
		});
	}

	update (req) {
		const kategori = new Kategori({
			jenis_id	: req.jenis_id,
		    nama 		: req.nama,
		    updated_at	: new Date
		});

		kategori.set('id',  req.id);

		kategori.save((err, rows) => {
		 	if (err) throw err;
		});
	}

	delete (req) {
		const kategori = new Kategori({
			deleted_at	: new Date
		});

		kategori.set('id',  req.id);

		kategori.save((err, rows) => {
		 	if (err) throw err;
		});
	}

	getAll () {
		return new Promise((resolve, reject) => {
			this.model.find('all', {where: "deleted_at IS NULL"}, (err, result, fields) => {
				if (err) throw err;

				resolve(result);
			});
		}); 
	}

	getIndexData (req) {
		return new Promise((resolve, reject) => {
			let where = ''
			if (req.jenis_id != '' && req.jenis_id !== undefined) {
				where = `a.jenis_id = ${req.jenis_id} AND `
			}

			const query = `SELECT a.*,
								b.nama as jenis
							FROM kategori a
							JOIN jenis b ON a.jenis_id = b.id
							WHERE ${where} a.deleted_at IS NULL`

			this.model.query(query, (err, result, fields) => {
				if (err) throw err;

				resolve(result);
			});
		}); 
	}
}

module.exports = new KategoriRepository;