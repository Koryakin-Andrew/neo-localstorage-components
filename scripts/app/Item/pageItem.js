function MainComponent(itemsLoadService){
      this.allItems=[];

      this.$onInit=function(){
            var main=this;

            itemsLoadService.loadPromise.then(function(data){
                  main.allItems=data;
            },function(error){ });

            // инициализация загрузки новых данных
            itemsLoadService.loadedSuccess();
      }

      this.onSelect=function(item){
            this.selectedItem=item;
      };

      this.isItemSelected=function(item){
            return (this.selectedItem != null 
                  && this.selectedItem==item);
      }

      this.onAddNewItem=function(item){
            var vm=this;
             // настройка сервиса обновления значений
             itemsLoadService.savePromise().then(function(data){
                  if(data!=null){
                        vm.allItems[vm.allItems.length]=data;
                        alert("Новая запись добавлена");
                  }
                  else{
                        alert("Ошибка сохранения в локальное хранилище");
                  }
            },function(error){
                  alert("Ошибка сохранения на клиенте");
            });
            // инициализация сохранение новых данных
            itemsLoadService.saveSuccess(item);
      }
}

angular.module("itemApp").component("mainComponent",{

      templateUrl:'scripts/app/Item/views/pageItem.tpl.html',
      controller: MainComponent
      
});