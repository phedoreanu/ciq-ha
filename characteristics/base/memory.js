const bleno = require('@abandonware/bleno');
const os = require('os');
const util = require('util');
const logIt = require('../../logit')

const BlenoCharacteristic = bleno.Characteristic;

const MemoryCharacteristic = function (UUID) {
    MemoryCharacteristic.super_.call(this, {
        uuid: UUID,
        properties: ['read'],
    });

    this._value = Buffer.from([0]);
};

MemoryCharacteristic.prototype.onReadRequest = function (offset, callback) {

    if (!offset) {
//os.freemem()
//os.totalmem()

        this._value = Buffer.from(JSON.stringify({'mem': os.freemem()}));

        if (logIt) {
            console.log('Base Memory Char - onReadRequest: value = ' +
                this._value.slice(offset, offset + bleno.mtu).toString()
            );
        }
    }
    callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

util.inherits(MemoryCharacteristic, BlenoCharacteristic);
module.exports = MemoryCharacteristic;
