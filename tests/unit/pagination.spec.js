'use strict';


describe('Test Pagination', function () {
  beforeEach(module('pagination'));

  describe('Filtre pour calculer la page max', function () {
    
    it('doit retourner 1 avec 0 éléments', inject(function (maxPageForItemsFilter) {
      var maxPage = maxPageForItemsFilter(0, 10);
      expect(maxPage).toEqual(1);
    }));
    
    it('doit retourner 11 avec 101 éléments et 10 items', inject(function (maxPageForItemsFilter) {
      var maxPage = maxPageForItemsFilter(101, 10);
      expect(maxPage).toEqual(11);
    }));
    
  });
  
});
