(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListController', ShoppingListController)
.controller('BoughtListController', BoughtListController)
.service('ShoppingListService', ShoppingListService);

ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
  var shopList = this;

  shopList.items = ShoppingListService.getItems();
  shopList.filled = false;

  shopList.markBought = function(itemIndex)
  {
    ShoppingListService.addToBought(itemIndex);
    shopList.filled = ShoppingListService.isListFilled();
  };
}

BoughtListController.$inject = ['ShoppingListService'];
function BoughtListController(ShoppingListService) {
  var boughtList = this;
  boughtList.items = ShoppingListService.getBoughtItems();

}


function ShoppingListService() {
  var service = this;

  // List of shopping items
  var items = [
    {name: "bagels", quantity: 12},
    {name: "cream cheese", quantity: 2},
    {name: "yogurt", quantity: 6},
    {name: "steaks", quantity: 2},
    {name: "potatoes", quantity: 2}
  ];


  var itemsBought = [];

  service.isListFilled = function()
  {
    var filled = false;
    if (items && itemsBought && items.length == itemsBought.length)
      filled = true;
    console.log("filled: "+ filled);
    return filled;
  }

  service.addToBought = function(itemIndex)
  {
    if (itemsBought.indexOf(items[itemIndex]) < 0) {
       itemsBought.push(items[itemIndex]);
    }
  };

  service.getBoughtItems = function()
  {
    return itemsBought;
  }

  service.getItems = function () {
    return items;
  };

  service.isBoughtEmpty = function()
  {
    var empty =false;
    if(itemsBought && itemsBought.length < 1)
     empty = true;
    console.log("empty: "+ empty);
    return empty;
  }


}

})();
