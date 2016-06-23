var page = require('webpage').create();
var system = require('system');

if(!system.args[1]){
    console.error('url is required');
    phantom.exit();
}

page.settings.userAgent = 'SpecialAgent';
page.open(system.args[1], function (status) {
    if (status !== 'success') {
        console.error('Unable to access network');
    } else {
        console.log(page.frameContent);
    }
    phantom.exit();
});
