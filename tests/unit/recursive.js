'use strict';


describe('Test Recursive', function () {
  var $compile;
  var $rootScope;
  
  beforeEach(module('recursive'));
  
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  
  it('doit créer un arbre', function () {
    $rootScope.tree = [
      {
        name: 'A.x.x',
        children: []
      },
      {
        name: 'B.x.x',
        children: [
          {
            name: 'B.A.x',
            children: []
          },
          {
            name: 'B.B.x',
            children: [
              {
                name: 'B.B.A'
              }
            ]
          }
        ]
      }
    ];
    
    var template = ''
    + '<recursive>'
    + '  <ul ng-repeat="item in tree">'
    + '    <li>'
    + '      {{ item.name }}'
    + '      <call-recursive rebind="tree = item.children"></call-recursive>'
    + '    </li>'
    + '  </ul>'
    + '</recursive>';
    
    var tree = $compile(template)($rootScope);
    $rootScope.$digest();
    
    expect($(tree).find('> ul > li')).toContainText('A.x.x');
    expect($(tree).find('> ul > li')).toContainText('B.x.x');
    expect($(tree).find('> ul > li > * > ul > li')).toContainText('B.A.x');
    expect($(tree).find('> ul > li > * > ul > li')).toContainText('B.B.x');
    expect($(tree).find('> ul > li > * > ul > li > * > ul > li')).toContainText('B.B.A');
  });

});
