"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessagesDA = /** @class */ (function () {
    function MessagesDA() {
    }
    MessagesDA.prototype.testGet = function (req, res) {
        res.json({
            ok: true,
            mensaje: "Todo OK",
        });
    };
    MessagesDA.prototype.testPost = function (req, res) {
        res.json({
            ok: true,
            mensaje: "Todo OK en el POST",
        });
    };
    return MessagesDA;
}());
exports.default = MessagesDA;
