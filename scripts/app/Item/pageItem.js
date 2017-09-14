'use strict';
function MainComponent(itemsLoadService){
      this.allItems=new Array(0);

      this.$onInit=function(){
            let vm=this;

            itemsLoadService.loadPromise.then(function(data){
                  vm.allItems=data;
            },function(error){ });

            itemsLoadService.loadedSuccess();
      }

      this.onSelectItem=function(item){
            this.selectedItem=item;
      };

      this.onAddNewItem=function(item){
            let vm=this;

            itemsLoadService.savePromise().then(
            function(data){
                  
                  if(!data){
                        alert('Ошибка сохранения в локальное хранилище');
                  }

                  vm.allItems[vm.allItems.length]=data;
                  alert('Новая запись добавлена');
            },function(error){
                  alert('Ошибка сохранения на клиенте');
            });

            itemsLoadService.saveSuccess(item);
      }
}

angular.module('itemApp').component('mainComponent',{

      templateUrl:'scripts/app/Item/views/pageItem.tpl.html',
      controller: MainComponent
      
});