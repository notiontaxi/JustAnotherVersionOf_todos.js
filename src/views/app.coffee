define ['text!templates/app/stats.tmp'], (statsTemp) ->
  module = () ->
  module.create = (properties) -> new AppView(properties)

  class AppView extends Backbone.View
   
    buildStats: _.template(statsTemp) 
    events: {
    'keypress #new-todo': 'createOnEnter',
    'keyup #new-todo': 'showTooltip',
    'click .todo-clear a': 'clearCompleted'}
    el: $('#todoapp')

    initialize: (properties) -> 
      @collection = properties.collection
      @input = @$('#new-todo')   # input field

      @collection.bind('add',   @addOne)
      @collection.bind('reset', @addAll)
      @collection.bind('all',   @render) # call render for each change
      @collection.fetch()

    render: () =>
      total = @collection.length
      done = @collection.getDoneElements().length
      remaining = total - done
                             # returns a html element with the passed parameters (see _.templates)
      $('#todo-stats').html(@buildStats({total: total, done : done, remaining: remaining}))

    addOne: (todo) ->
      require(['views/todo'], (todoView) =>
        view = todoView.create({ model : todo })
        $('#todo-list').append(view.render().el)
        )

    addAll: () =>  @collection.each(@addOne)

    createOnEnter: (e) ->
      text = @input.val()  # input = inputfield
      if ((e.keyCode == 13) && (!!text))
        @collection.create({text: text})
        @input.val('')

    clearCompleted: () -> 
      _.each(@collection.getDoneElements(), (todo) -> todo.destroy())
      false

    showTooltip: (e) ->
      tooltip = @$('.ui-tooltip-top')
      val = @input.val()
      tooltip.fadeOut()
      if @tooltipTimeout 
        clearTimeout(@tooltipTimeout)
      if not (val == '' || val == @input.attr('placeholder'))
        show = -> tooltip.show().fadeIn()
        @tooltipTimeout = _.delay(show, 1000)

  module