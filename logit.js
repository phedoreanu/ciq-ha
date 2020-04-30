//
// this controls the over-all console logging, and to
// turn it on/off, change the following to true or false
// To over ride it for a specific file, look for
// var logIt=require('../../logit');
// and change it to something like
// var logIt=true;
//
module.exports=(process.env.LOG === 'true');
