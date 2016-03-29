'use strict';

describe('Controller: SubirCtrl', function () {

  // load the controller's module
  beforeEach(module('faptoriaApp'));

  var SubirCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubirCtrl = $controller('SubirCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SubirCtrl.awesomeThings.length).toBe(3);
  });
});
