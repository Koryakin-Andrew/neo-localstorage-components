function localService($q,$rootScope){
      var loadDeffer=$q.defer();
      var lStore=window.localStorage;
      var saveDeffer=$q.defer();
      return{
            loadPromise: loadDeffer.promise,
            loadedSuccess:function(){
                  if(localStorage!=null && localStorage.ItemsStorage!=null)
                  {
                        loadDeffer.resolve(JSON.parse(localStorage.getItem("ItemsStorage")));
                  }
                  else{
                        loadDeffer.resolve([]);
                  }
            },
            loadedFail:function(error){
                  loadDeffer.reject(error);
                  
            },
            savePromise: function(){
                  saveDeffer=$q.defer()
                  return saveDeffer.promise;
            },
            saveSuccess:function(data){
                  if(data!=null && localStorage!=null){
                        try{
                              allData=JSON.parse(localStorage.getItem("ItemsStorage"));
                              if(allData==null){
                                    allData=[];
                              }
                              allData[allData.length]=data;
                              localStorage.setItem("ItemsStorage",JSON.stringify(allData));
                              saveDeffer.resolve(data);
                        }
                        catch(error){
                              saveDeffer.reject("Ошибка при сохранении в локальное хранилище");      
                        }
                  }
                  else{
                        saveDeffer.reject("локальное хранилище не доступно");
                  }
            }
      }
};

angular.module("itemApp").provider('itemsLoadService',function(){
      return {
            $get:localService
      }
});        