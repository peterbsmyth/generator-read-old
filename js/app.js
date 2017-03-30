angular.module('read', ['ngFileSaver']);

angular.module('read')
.controller('ReadCtrl', function($scope, FileSaver, Blob) {
    $scope.data;

    $scope.fn = {
      generate: generate
    };

    function generate(form) {
      var title = `# ${$scope.data.title} \n`;
      var subtitle = `## ${$scope.data.subtitle} \n`;
      var author = `## ${$scope.data.author} \n`;
      var buy = `[Amazon](${$scope.data.amazon}) | [B&N](${$scope.data.bn}) \n\n`;
      var chapters = "## Chapters \n";
      var data = new Blob([title, subtitle, author, buy, chapters], { type: 'text/plain;charset=utf-8' });
      FileSaver.saveAs(data, 'README.md');
    }


});
