"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessagesController = /** @class */ (function () {
    function MessagesController() {
    }
    MessagesController.prototype.testGet = function (req, res) {
        res.json({
            ok: true,
            mensaje: "Todo OK",
        });
    };
    MessagesController.prototype.testPost = function (req, res) {
        var message = req.body.message;
        res.json({
            ok: true,
            message: message,
        });
    };
    MessagesController.prototype.testPostId = function (req, res) {
        var message = req.body.message;
        var id = req.params.id;
        res.json({
            ok: true,
            id: id,
            message: message,
        });
    };
    return MessagesController;
}());
exports.default = MessagesController;
