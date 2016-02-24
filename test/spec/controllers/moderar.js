'use strict';

describe('Controller: ModerarCtrl', function () {

  // load the controller's module
  beforeEach(module('faptoriaApp'));

  var ModerarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModerarCtrl = $controller('ModerarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ModerarCtrl.awesomeThings.length).toBe(3);
  });
});
