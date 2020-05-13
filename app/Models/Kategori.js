const mysqlModel = require('../connection');

var Kategori = mysqlModel.extend({
    tableName: "kategori",
});

module.exports = Kategori;