 class Conversion {
    constructor(){
        this.message= "The conversion will be realized";
        this.value= 0;
    
        this.conversionData = {
            from: "",
            to: "",
            result: 0
        };
    }    
    
    showValues() {
      console.log( this.message + " from " + this.conversionData.from + " to " + this.conversionData.to + " and the result is " + this.conversionData.result  );    
    };
    updateMyConfig (fromValue,toValue,value) {
      this.value = value;
      this.conversionData.from = fromValue;
      this.conversionData.to = toValue;
      this.conversionData.result = this.conversion();	
    };
     /*conversion(){        
      if(this.conversionData.from == "Celsius" && this.conversionData.to == "Farenheit"){
        console.log("Convert Data from Celsius to Farenheit");
      return (this.value * (9/5) + 32);
      }
      if(this.conversionData.from == "Farenheit" && this.conversionData.to == "Celsius"){
        console.log("Convert Data from Farenheit to Celsius");
      return ((this.value - 32) * (5/9));
      }
      return 0;
     };*/
     conversion() {  
         var from = this.conversionData.from;
         var to = this.conversionData.to; 
         var value = this.value; 
        var promise = new Promise(function (success, error) {                      
            if( from == "Celsius" && to == "Farenheit"){
                console.log("Convert Data from Celsius to Farenheit");
                success(value * (9/5) + 32);
              }
            if(from == "Farenheit" && to == "Celsius"){
                console.log("Convert Data from Farenheit to Celsius");
                success((value - 32) * (5/9));
            }
            //error(Error(0));
        });
        return promise;
     }    
     
  };


  var View = {}, Controller = {};
  
  View = {
      result : document.querySelector("#result"),    
      update: function(Model){		
          this.result.value = Model.conversionData.result;
      }
  }
  
  C = {
      model: new Conversion(),
      view: View,
      handler: function(){
          var number = document.getElementById("number").value;
          var from = document.getElementById("select1");
          var to = document.getElementById("select2");
  
          console.log(number + " " + from.options[from.selectedIndex].value + " " + to.options[to.selectedIndex].value);
          
          this.model.value = number;
          this.model.conversionData.from = from.options[from.selectedIndex].value;
          this.model.conversionData.to = to.options[to.selectedIndex].value;
          
          this.model.conversion().then(function(success){  
            let modelaux = new Conversion();
            modelaux.conversionData.result = success;                           
            C.view.update(modelaux);
          }, function(error){
            console.log(error);
          });        
      }
  }
  //document.getElementById("btnid").addEventListener("click", myFunction);
  document.querySelector("#btnid").addEventListener("click", () => C.handler.call(C)); 
  /*document.querySelector("#btnid").addEventListener("click", function(){
      C.handler.call(C);
  }); */