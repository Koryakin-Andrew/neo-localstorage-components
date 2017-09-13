function AddItem(){
      this.name="";
      this.description="";

      this.$onInit=function(){};

      this.onSubmit=function(){
            var vm=this.addItemForm;
            if(vm.$valid){
                  this.addItem({item:{name:this.name,description:this.description}});
                  this.name="";
                  this.description="";
            }
            else{
                  alert("Оба поля обязательны к заполнению");
            }
      }
}

angular.module("itemApp").component("addItem",{
   templateUrl:'scripts/app/Item/views/addItem.tpl.html',
   bindings:{
      addItem:'&'
   },
   controller: AddItem
});