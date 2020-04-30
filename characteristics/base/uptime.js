const bleno = require('@abandonware/bleno');
const os = require('os');
const util = require('util');
const logIt = require('../../logit');

const BlenoCharacteristic = bleno.Characteristic;

const UptimeCharacteristic = function (UUID) {

    UptimeCharacteristic.super_.call(this, {
        uuid: UUID,
        properties: ['read'],
    });

    this._value = new Buffer.alloc(0);
};

UptimeCharacteristic.prototype.onReadRequest = function (offset, callback) {

    if (!offset) {
        this._value = Buffer.from(JSON.stringify({'uptime': os.uptime()}));

        if (logIt) {
            console.log('Base UpTime Char - onReadRequest: value = ' +
                this._value.slice(offset, offset + bleno.mtu).toString()
            );
        }
    }

    callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

util.inherits(UptimeCharacteristic, BlenoCharacteristic);
module.exports = UptimeCharacteristic;
