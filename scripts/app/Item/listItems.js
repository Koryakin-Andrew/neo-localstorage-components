'use strict';
function ListItems(){

      this.onSelectItem=function(item){
            this.selectedItem = item;
            this.onSelect({ item: item });
      };

      this.isSelectedItem=function(item){
            return (this.selectedItem != null 
                  && this.selectedItem==item);
      }
}

angular.module('itemApp').component('listItems',{
   templateUrl:'scripts/app/Item/views/listItems.tpl.html',
   bindings:{
      allItems:'<',
      onSelect:'&'
   },
   controller: ListItems
});