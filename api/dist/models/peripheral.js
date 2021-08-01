"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.peripheralSchema = void 0;

var _mongoose = require("mongoose");

var peripheralSchema = new _mongoose.Schema({
  vendor: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    "default": Date.now
  },
  status: {
    type: String,
    required: true,
    options: ['online', 'offline']
  }
});
exports.peripheralSchema = peripheralSchema;

var _default = (0, _mongoose.model)('peripheral', peripheralSchema, 'Peripheral');

exports["default"] = _default;