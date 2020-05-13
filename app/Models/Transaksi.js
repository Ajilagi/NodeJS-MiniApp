const mysqlModel = require('../connection');

var Transaksi = mysqlModel.extend({
    tableName: "transaksi",
});

module.exports = Transaksi;