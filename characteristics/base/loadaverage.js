const bleno = require('@abandonware/bleno');
const os = require('os');
const util = require('util');
const logIt = require('../../logit')

const BlenoCharacteristic = bleno.Characteristic;

const LoadAverageCharacteristic = function (UUID) {
    LoadAverageCharacteristic.super_.call(this, {
        uuid: UUID,
        properties: ['read'],
    });

    this._value = new Buffer.alloc(0);
};

LoadAverageCharacteristic.prototype.onReadRequest = function (offset, callback) {

    if (!offset) {

        const loadAverage = os.loadavg().map(function (currentValue, index, array) {
            return currentValue.toFixed(3);
        });

//'oneMin' : loadAverage[0],
//'fiveMin': loadAverage[1],
//'fifteenMin': loadAverage[2]

        this._value = new Buffer.from(JSON.stringify({'load': loadAverage[1]}));

        if (logIt) {
            console.log('Base LoadAvg Char - onReadRequest: value = ' +
                this._value.slice(offset, offset + bleno.mtu).toString()
            );
        }
    }

    callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

util.inherits(LoadAverageCharacteristic, BlenoCharacteristic);
module.exports = LoadAverageCharacteristic;
