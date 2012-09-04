define () ->
  module = ->
  module.create = (properties) ->
    new TodoList(properties)


  class TodoList extends Backbone.Collection

    localStorage: new Store('todos') 

    getDoneElements: () ->
      #Looks through each value in the list, returning an array of all the values that 
      #pass a truth test (iterator). Delegates to the native filter method, if it exists.		
      this.filter (todo) -> todo.get('done') 
          
    nextOrder: () -> 
      if !this.length then 1 else this.last().get('order') + 1

    comparator: (todo) -> todo.get('order')





  module