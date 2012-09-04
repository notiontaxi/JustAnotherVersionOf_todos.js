define ['text!templates/todo/list.tmp'], (todoTmp) ->
  module = ->
  module.create = (properties) ->
    return new TodoView(properties)


  class TodoView extends Backbone.View
  
    template: _.template(todoTmp)
    events: { 
      'click .check' : 'toggleDone',
      'dblclick div.todo-text' : 'edit',
      'click span.todo-destroy' : 'clear',
      'keypress .todo-input' : 'updateOnEnter'}
    tagName: 'li'

    initialize: -> 
      @model.bind('change', @render)
      @model.bind('destroy', @remove)
      
    render: =>
      $(@el).html(@template(@model.toJSON()))
      @setText(@model.get('text'))
      @

    setText: (text) =>
      @$('.todo-text').text(text)
      @input = @$('.todo-input');
      @input.bind('blur', @close)
      @input.val(text)

    toggleDone: => @model.toggle()

    edit: =>
      console.log("edit") 
      $(@el).removeClass('editing')

    updateOnEnter: (e) => if e.keycode = 13 then @close()

    close: => 
      @model.save({text: @input.val()})
      $(@el).removeClass(editing)

    remove: => $(@el).remove()

    clear: -> @model.destroy()
            

  module