const bleno = require('@abandonware/bleno');
const logIt = require('./logit');

const CiqService = require('./ciqbaseservice');
const ciqService = new CiqService();

bleno.on('stateChange', function (state) {
    console.log('Using Base Characteristics');

    if (logIt) {
        console.log('on -> stateChange: ' + state);
    }

    if (state === 'poweredOn') {
        bleno.startAdvertising(ciqService.name, [ciqService.uuid]);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', function (error) {
    if (logIt) {
        console.log('on -> advertisingStart: ' +
            (error ? 'error ' + error : 'success')
        );
    }

    if (!error) {
        bleno.setServices([
            ciqService
        ]);
    }
});

bleno.on('disconnect', function (error) {
    if (logIt) {
        console.log('-> disconnect <-');
    }
}); 
