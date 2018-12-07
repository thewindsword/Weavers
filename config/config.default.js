const apilist = require('./api.list');
exports.keys = "thewindsword";
exports.middleware = [ 'passparams' ];
exports.security = {
    csrf: {
        enable: false,
    },
};

exports.serverUrl = "http://47.106.36.139";
exports.apilist = apilist;