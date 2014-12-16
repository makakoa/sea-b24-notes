'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('UsersController', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var $cookies;

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, $rootCookies) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
    $cookies = $rootCookies;
  }));

  it('should be able to create a controller', function() {
    var usersController = $controllerConstructor('UsersCtrl', {$scope: $scope});
    expect(typeof usersController).toBe('object');
  });

  describe('User routes', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, _$cookies_) {
      $httpBackend = _$httpBackend_;
      $controllerConstructor('UsersCtrl', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should post user request', function() {
      $httpBackend.expectPOST('/api/users').respond(200, {jwt: '123'});
      $scope.newUser = {
        email: 'test@email',
        password: 'testpass',
        passwordConfirmation: 'testpass'
      };
      $scope.signUp();
      $httpBackend.flush();
      expect($cookies.jwt).toBe('123');
    });

  });
});
