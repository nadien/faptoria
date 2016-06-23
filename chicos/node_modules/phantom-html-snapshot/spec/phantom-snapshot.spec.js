describe('unit tests html snapshots', function () {
    var mockery = require('mockery');
    var mockedPhantomJs = {
        path: './a/path/to/bin/phantomjs'
    };

    var mockedChildProcess = null;
    var phantomHtmlSnapshot = null;

    beforeEach(function () {
        mockery.enable({useCleanCache: true});

        mockery.registerAllowable('../');
        mockery.registerAllowable('validator');
        mockery.registerAllowable('path');

        mockedChildProcess = {
            execFile: jasmine.createSpy('execFile')
        };

        mockery.registerMock('phantomjs', mockedPhantomJs);
        mockery.registerMock('child_process', mockedChildProcess);

        phantomHtmlSnapshot = require('../');
    });

    afterEach(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should return the html from a valid url', function () {
        var url = 'http://example.com';
        var callback = jasmine.createSpy('callback');
        var htmlContent = 'html content';

        mockedChildProcess.execFile.andCallFake(function (path, args, callback) {
            callback(null, htmlContent, null);
        });

        phantomHtmlSnapshot.snapshot(url, callback);


        var callArgs = mockedChildProcess.execFile.calls[0].args;
        expect(callArgs[0]).toEqual(mockedPhantomJs.path);
        expect(callArgs[1][0]).toEqual(jasmine.any(String));
        expect(callArgs[1][1]).toEqual(url);
        expect(callArgs[2]).toEqual(jasmine.any(Function));

        expect(callback).toHaveBeenCalledWith(null, htmlContent);
    });

    it('should return an error if phantomjs is unable to access the page', function () {
        var url = 'http://example.com';
        var callback = jasmine.createSpy('callback');
        var stdErrOutput = 'an error';

        mockedChildProcess.execFile.andCallFake(function (path, args, callback) {
            callback(null, null, stdErrOutput);
        });

        phantomHtmlSnapshot.snapshot(url, callback);

        expect(callback).toHaveBeenCalledWith(jasmine.any(Error));
    });

    it('should return an error if child_process returns an error', function () {
        var url = 'http://example.com';
        var callback = jasmine.createSpy('callback');
        var err = new Error('an error');

        mockedChildProcess.execFile.andCallFake(function (path, args, callback) {
            callback(err);
        });

        phantomHtmlSnapshot.snapshot(url, callback);

        expect(callback).toHaveBeenCalledWith(err);
    });
});
