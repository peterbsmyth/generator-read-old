angular.module('read', ['ngFileSaver','ui.router']);

angular.module('read')
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/readme');

  $stateProvider
    .state('readme', {
      url: "/readme",
      templateUrl: "partials/readme.html",
      controller: 'ReadCtrl'
    })
    .state('chapter', {
      url: "/chapter",
      templateUrl: "partials/chapter.html",
      controller: 'ReadCtrl'
    });

})

angular.module('read')
.factory('DataFactory', function() {
  function set(data, section) {
    this._data[section] = data;
  }

  function get(section) {
    return this._data[section] || null;
  }

  return {
    _data: {},
    set: set,
    get: get
  }
});

angular.module('read')
.controller('ReadCtrl', function($scope, FileSaver, Blob, DataFactory) {
    $scope.data = {};
    $scope.data.title = DataFactory.get('title');
    $scope.data.subtitle = DataFactory.get('subtitle');
    $scope.data.author = DataFactory.get('author');
    $scope.data.amazon = DataFactory.get('amazon');
    $scope.data.bn = DataFactory.get('bn');

    $scope.fn = {
      generateReadme: generateReadme,
      generateChapter: generateChapter,
      setData: setData,
      // getData: getData
    };



    function generateReadme(form) {
      var title = `# ${$scope.data.title} \n`;
      var subtitle = `## ${$scope.data.subtitle} \n`;
      var author = `## ${$scope.data.author} \n`;
      var buy = `[Amazon](${$scope.data.amazon}) | [B&N](${$scope.data.bn}) \n\n`;
      var chapters = "## Chapters \n";
      var data = new Blob([title, subtitle, author, buy, chapters], { type: 'text/plain;charset=utf-8' });
      FileSaver.saveAs(data, 'README.md');
    }

    function generateChapter(form) {
      var title = `# ${$scope.data.title} \n`;
      var subtitle = `## ${$scope.data.subtitle} \n`;
      var author = `## ${$scope.data.author} \n`;
      var buy = `[Amazon](${$scope.data.amazon}) | [B&N](${$scope.data.bn}) \n\n`;
      var chapter = `#### ${$scope.data.chapterTitle} \n`;
      var data = new Blob([title, subtitle, author, buy, chapter], { type: 'text/plain;charset=utf-8' });
      FileSaver.saveAs(data, `chapter_${$scope.data.chapterNum}.md`);
    }

    function setData(section) {
      console.log('action');
      DataFactory.set($scope.data[section], section);
    }

    // function getData()


});
