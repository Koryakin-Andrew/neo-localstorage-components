'use strict';
function localService($q,$rootScope){
      let loadDeffer=$q.defer();
      let saveDeffer = $q.defer();

      return{
            loadPromise: loadDeffer.promise,
            loadedSuccess:function(){
                  if(window.localStorage 
                        && window.localStorage.ItemsStorage)
                  {
                        loadDeffer.resolve(
                              JSON.parse(
                                    window
                                    .localStorage
                                    .getItem('ItemsStorage')
                              )
                        );
                  }
                  else{
                        loadDeffer.resolve(new Array(0));
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
                  if (!(data || window.localStorage)){
                        saveDeffer.reject('локальное хранилище не доступно');
                  }
                  try{
                        let allData=JSON.parse(window.localStorage.getItem('ItemsStorage')) 
                                    || new Array(0);
                        allData[allData.length]=data;
                        window.localStorage.setItem('ItemsStorage',JSON.stringify(allData));
                        saveDeffer.resolve(data);
                  }
                  catch(error){
                        saveDeffer.reject('Ошибка при сохранении в локальное хранилище');      
                  }
            }
      }
};

angular.module('itemApp').provider('itemsLoadService',function(){
      return {
            $get:localService
      }
});        