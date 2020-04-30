const util = require('util');
const bleno = require('@abandonware/bleno');
const logIt = require('../../logit');

const BlenoCharacteristic = bleno.Characteristic;

const WrtCharacteristic = function (UUID) {
    WrtCharacteristic.super_.call(this, {
        uuid: UUID,
        properties: ['read', 'write', 'notify'],
        value: null
    });

    this._value = Buffer.from([0, 0]);
    this._updateValueCallback = null;
};

util.inherits(WrtCharacteristic, BlenoCharacteristic);

WrtCharacteristic.prototype.onReadRequest = function (offset, callback) {
    if (logIt) {
        console.log('Base Write Char - onReadRequest: value = 0x' + this._value.toString('hex'));
    }
    callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

WrtCharacteristic.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
    this._value = data;
    if (logIt) {
        console.log('Base Write Char - onWriteRequest: value = 0x' + this._value.toString('hex'));
    }

    if (this._updateValueCallback) {
        console.log('Base Write Char - notifying');
        this._updateValueCallback(this._value);
    }

    callback(this.RESULT_SUCCESS);
};

WrtCharacteristic.prototype.onSubscribe = function (maxValueSize, updateValueCallback) {
    console.log('Base Write Char - onSubscribe');

    this._updateValueCallback = updateValueCallback;
};

WrtCharacteristic.prototype.onUnsubscribe = function () {
    console.log('Base Write Char - onUnsubscribe');

    this._updateValueCallback = null;
};

module.exports = WrtCharacteristic;
