const bleno = require('@abandonware/bleno');
const util = require('util');
const child_process = require('child_process');
const logIt = require('../../logit')

const BlenoCharacteristic = bleno.Characteristic;

const CpuTempCharacteristic = function (UUID) {
    CpuTempCharacteristic.super_.call(this, {
        uuid: UUID,
        properties: ['read'],
    });
    this._value = Buffer.from([0]);
};

CpuTempCharacteristic.prototype.onReadRequest = function (offset, callback) {
    if (!offset) {
        const temp = child_process.execSync(
            'cat /sys/class/thermal/thermal_zone0/temp',
            {encoding: 'utf-8'}).trim()
        this._value = Buffer.from(JSON.stringify({'temp': temp / 1000 + 'ºC'}));

        if (logIt) {
            console.log('Base Temp Char - onReadRequest: value = ' +
                this._value.slice(offset, offset + bleno.mtu).toString()
            );
        }
    }
    callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

util.inherits(CpuTempCharacteristic, BlenoCharacteristic);
module.exports = CpuTempCharacteristic;
