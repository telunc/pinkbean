'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Avatar = exports.Guild = undefined;

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// configure database
var sequelize = new _sequelize2.default(_config2.default.get('database').database, _config2.default.get('database').user, _config2.default.get('database').password, {
    host: _config2.default.get('database').host,
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8'
    },
    logging: true
});

// test connection
sequelize.authenticate().then(function () {
    console.log('Connected');
}).catch(function (error) {
    console.error('Connection error:', error);
});

var Guild = sequelize.define('guild', {
    id: { type: _sequelize2.default.STRING, primaryKey: true },
    sub_id: { type: _sequelize2.default.STRING },
    ping_id: { type: _sequelize2.default.STRING },
    notice_id: { type: _sequelize2.default.STRING },
    notice_msg: { type: _sequelize2.default.STRING },
    timer_id: { type: _sequelize2.default.STRING },
    prefix: { type: _sequelize2.default.STRING }
}, {
    timestamps: false
});

var Avatar = sequelize.define('avatar', {
    id: { type: _sequelize2.default.STRING, primaryKey: true },
    mercEars: { type: _sequelize2.default.STRING },
    selectedItems: { type: _sequelize2.default.TEXT },
    skin: { type: _sequelize2.default.STRING }
}, {
    timestamps: false
});

exports.Guild = Guild;
exports.Avatar = Avatar;