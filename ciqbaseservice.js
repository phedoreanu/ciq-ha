const bleno = require('@abandonware/bleno');
const util = require('util');

const CpuTemperatureCharacteristic = require('./characteristics/base/cpu_temp');
const LoadAverageCharacteristic = require('./characteristics/base/loadaverage');
const UptimeCharacteristic = require('./characteristics/base/uptime');
const MemoryCharacteristic = require('./characteristics/base/memory');
const WriteCharacteristic = require('./characteristics/base/write');

// env vars
const name = process.env.NAME
const UUID = process.env.UUID;

function CiqService() {
    bleno.PrimaryService.call(this, {
        name: name,
        uuid: UUID + '00',
        characteristics: [
            new CpuTemperatureCharacteristic(UUID + '14'),
            new LoadAverageCharacteristic(UUID + '12'),
            new MemoryCharacteristic(UUID + '10'),
            new UptimeCharacteristic(UUID + '11'),
            new WriteCharacteristic(UUID + '13')
        ]
    });
}

util.inherits(CiqService, bleno.PrimaryService);
module.exports = CiqService;
