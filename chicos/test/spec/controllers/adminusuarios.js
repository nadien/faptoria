'use strict';

describe('Controller: AdminusuariosCtrl', function () {

  // load the controller's module
  beforeEach(module('faptoriaApp'));

  var AdminusuariosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminusuariosCtrl = $controller('AdminusuariosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminusuariosCtrl.awesomeThings.length).toBe(3);
  });
});
