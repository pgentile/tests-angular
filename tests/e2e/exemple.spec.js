describe('Accueil Tests AngularJS', function () {
  it('doit afficher la page d\'accueil', function () {
    browser.get('');
    
    var title = $('h1');
    expect(title.getText()).toContain('Accueil');
    
    var nameInput = $('input#graph-name');
    nameInput.sendKeys('Pierre');
    
    var okButton = element(by.cssContainingText('button', 'OK')).click();
    
    browser.driver.switchTo().alert().accept();
  });
  
  it('doit naviguer sur la page suivante', function () {
    browser.get('');
    
    var trucsLink = element(by.cssContainingText('nav ul.nav > li a', 'Trucs'));
    trucsLink.click();
    
    var title = $('h1');
    expect(title.getText()).toEqual('Tabs avec Bootstrap');
  });
  
  it('doit naviguer sur la pagination', function () {
    browser.get('');
    
    var paginationLink = element(by.cssContainingText('nav ul.nav > li a', 'Pagination'));
    paginationLink.click();
    
    var title = $('h1');
    expect(title.getText()).toEqual('Pagination');
  });
});
