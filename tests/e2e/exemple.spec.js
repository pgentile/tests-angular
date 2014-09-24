'use strict';

var util = require('util');


function BasePage() {
  var navBar = element(by.css('nav'));
  
  this.open = function () {
    browser.get(''); // TODO Ne pas le faire à chaque test
    
    for (var i = 0; i < arguments.length; i++) {
      var text = arguments[i];
      navBar.element(by.cssContainingText('a', text)).click();
    }
  };
  
  this.getTitle = function () {
    return element(by.css('h1')).getText();
  };

}


function AccueilPage() {
  BasePage.call(this);
  
  var nameInput = $('input#graph-name');
  var replicatInput = $('input#repliquat-name');
  
  var nameDisplay = element(by.cssContainingText('p', 'Nom :'));
  var okButton = element(by.buttonText('OK'));
  
  this.setName = function (name) {
    nameInput.clear().then(function () {
      nameInput.sendKeys(name);
    });
  };
  
  this.getName = function () {
    return nameInput.getAttribute('value');
  };
  
  this.setReplicat = function (replicat) {
    replicatInput.clear().then(function () {
      replicatInput.sendKeys(replicat);
    });
  };
  
  this.getReplicat = function () {
    return replicatInput.getAttribute('value');
  };
  
  this.getNameDisplay = function () {
    return nameDisplay.getText();
  };
  
  this.submit = function () {
    okButton.click();
  };
  
  this.dismissAndReadAlert = function () {
    var alert = browser.switchTo().alert();
    var accepted = alert.accept();
    return alert.getText();
  };
  
}

util.inherits(AccueilPage, BasePage);


function PaginationPage() {
  BasePage.call(this);
}

util.inherits(PaginationPage, BasePage);


function TrucsPage() {
  BasePage.call(this);
}

util.inherits(TrucsPage, BasePage);


describe('Tests AngularJS', function () {
  
  it('doit naviguer sur la page d\'accueil', function () {
    var page = new AccueilPage();
    page.open('Accueil');
    
    expect(page.getTitle()).toContain('Accueil');
    
    var name = 'Pierre';
    
    page.setName(name);
    expect(page.getReplicat()).toEqual(name);
    
    expect(page.getNameDisplay()).toEqual('Nom : ' + name);
    
    page.submit();
    expect(page.dismissAndReadAlert()).toEqual('Salut, ' + name + ' !');
    
    var newName = 'Roberto';
    
    page.setReplicat(newName);
    expect(page.getReplicat()).toEqual(newName);
    
    expect(page.getNameDisplay()).toEqual('Nom : ' + newName);
  });
  
  it('doit naviguer sur la page des trucs', function () {
    var page = new TrucsPage();
    page.open('Intégration', 'Trucs');

    expect(page.getTitle()).toEqual('Tabs avec Bootstrap');
  });
  
  it('doit naviguer sur la pagination', function () {
    var page = new PaginationPage();
    page.open('Intégration', 'Pagination');
    
    expect(page.getTitle()).toEqual('Pagination');
  });
});
