define ['collections/todos', 'views/app', 'models/todo'],  (todosColl, appView, todosModel) ->  
  module = () ->
  module.init = () ->   

    collection = todosColl.create() 
    model = todosModel.create() 
    collection.model = model

    appView.create({'collection' : collection})            
  module