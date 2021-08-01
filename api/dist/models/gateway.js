"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _peripheral = require("./peripheral");

var gatewaySchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ipv4: {
    type: String,
    required: true,
    unique: true
  },
  peripheral: {
    type: [_peripheral.peripheralSchema],
    max: 10
  }
});

var _default = (0, _mongoose.model)('gateway', gatewaySchema, 'Gateway');

exports["default"] = _default;