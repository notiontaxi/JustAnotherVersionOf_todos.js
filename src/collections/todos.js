(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function() {
    var TodoList, module;
    module = function() {};
    module.create = function(properties) {
      return new TodoList(properties);
    };
    TodoList = (function(_super) {

      __extends(TodoList, _super);

      function TodoList() {
        TodoList.__super__.constructor.apply(this, arguments);
      }

      TodoList.prototype.localStorage = new Store('todos');

      TodoList.prototype.getDoneElements = function() {
        return this.filter(function(todo) {
          return todo.get('done');
        });
      };

      TodoList.prototype.nextOrder = function() {
        if (!this.length) {
          return 1;
        } else {
          return this.last().get('order') + 1;
        }
      };

      TodoList.prototype.comparator = function(todo) {
        return todo.get('order');
      };

      TodoList.prototype.test1 = function(v) {
        console.log(this);
        return console.log("" + v + " test1");
      };

      TodoList.prototype.test2 = function(v) {
        console.log(this);
        console.log(v);
        return console.log("test2");
      };

      return TodoList;

    })(Backbone.Collection);
    return module;
  });

}).call(this);
