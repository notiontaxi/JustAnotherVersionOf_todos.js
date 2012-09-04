(function() {

  define(['collections/todos', 'views/app', 'models/todo'], function(todosColl, appView, todosModel) {
    var module;
    module = function() {};
    module.init = function() {
      var collection, model;
      collection = todosColl.create();
      model = todosModel.create();
      collection.model = model;
      return appView.create({
        'collection': collection
      });
    };
    return module;
  });

}).call(this);
