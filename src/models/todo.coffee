# define the module, which will be returned, when u use something like "define ['myModuleX'] (X) -> X.create() to use the class behind X" 
define ->
  module = () ->  
  module.create = (properties) -> 
  
    class todo extends Backbone.Model 
      defaults: () -> {done: false}
      toggle: () -> this.save({done: !this.get("done")}) 

    todo            
  module