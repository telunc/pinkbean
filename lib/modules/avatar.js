'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _database = require('./database');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: 'getAvatarWithId',
        value: async function getAvatarWithId(id) {
            return _database.Avatar.findOne({ where: { id: id } }).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: 'updateAvatarWithId',
        value: async function updateAvatarWithId(id, post) {
            var avatar = await this.getAvatarWithId(id);
            if (!avatar) return;
            return avatar.update(post);
        }
    }, {
        key: 'setAvatar',
        value: async function setAvatar(post) {
            return _database.Avatar.create(post);
        }
    }, {
        key: 'deleteAvatarWithId',
        value: async function deleteAvatarWithId(id) {
            return _database.Avatar.destroy({ where: { id: id } }).catch(function (error) {
                console.error(error);
            });
        }
    }]);

    return _class;
}();

exports.default = _class;