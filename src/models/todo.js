(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function() {
    var module;
    module = function() {};
    module.create = function(properties) {
      var todo;
      todo = (function(_super) {

        __extends(todo, _super);

        function todo() {
          todo.__super__.constructor.apply(this, arguments);
        }

        todo.prototype.defaults = function() {
          return {
            done: false
          };
        };

        todo.prototype.toggle = function() {
          return this.save({
            done: !this.get("done")
          });
        };

        return todo;

      })(Backbone.Model);
      return todo;
    };
    return module;
  });

}).call(this);
