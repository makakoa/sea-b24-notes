'use strict';

module.exports = function(app) {
  app.controller('notesCtrl', ['$scope', '$http', 'ResourceBackend', 'cookieService', function($scope, $http, ResourceBackend, cookieService) {
    var notesBackend = new ResourceBackend('notes');

    $scope.index = function() {
      cookieService.checkAuth();
      notesBackend.index()
      .success(function(data) {
        $scope.notes = data;
      });
    };

    $scope.saveNewNote = function(newNote) {
      notesBackend.saveNew(newNote)
      .success(function(data) {
        $scope.notes.push(data);
        $scope.newNote = null;
      });
    };

    $scope.saveNote = function(note) {
      notesBackend.save(note)
      .success(function() {
        note.editing = false; 
      });
    };

    $scope.deleteNote = function(note) {
      notesBackend.delete(note)
      .success(function() {
        $scope.notes.splice($scope.notes.indexOf(note), 1);
      });
    };

    $scope.signout = function() {
      cookieService.signout();
    };
  }]);
};
