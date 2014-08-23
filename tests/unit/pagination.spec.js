'use strict';


describe('Test Pagination', function () {
  beforeEach(module('pagination'));

  describe('Filtre pour calculer la page max', function () {
    
    var maxPageForItems;
    
    beforeEach(inject(function(maxPageForItemsFilter) {
      maxPageForItems = maxPageForItemsFilter;
    }));
    
    it('doit retourner 1 avec 0 éléments', function () {
      var maxPage = maxPageForItems(0, 10);
      expect(maxPage).toEqual(1);
    });
    
    it('doit retourner 11 avec 101 éléments et 10 items', function () {
      var maxPage = maxPageForItems(101, 10);
      expect(maxPage).toEqual(11);
    });
    
  });
  
});
