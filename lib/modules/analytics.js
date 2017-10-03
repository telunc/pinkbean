'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _universalAnalytics = require('universal-analytics');

var _universalAnalytics2 = _interopRequireDefault(_universalAnalytics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (action, message) {

    var visitor = (0, _universalAnalytics2.default)('UA-91359269-3', message.author.id, { strictCidFormat: false });
    var label = message.guild ? 'Guild: ' + message.guild.name + ' ' + message.guild.id : 'User: ' + message.author.username;
    var params = { ec: 'Maple', ea: action, el: label };

    visitor.event(params).send();
};