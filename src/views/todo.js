(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['text!templates/todo/list.tmp'], function(todoTmp) {
    var TodoView, module;
    module = function() {};
    module.create = function(properties) {
      return new TodoView(properties);
    };
    TodoView = (function(_super) {

      __extends(TodoView, _super);

      function TodoView() {
        this.remove = __bind(this.remove, this);
        this.close = __bind(this.close, this);
        this.updateOnEnter = __bind(this.updateOnEnter, this);
        this.edit = __bind(this.edit, this);
        this.toggleDone = __bind(this.toggleDone, this);
        this.setText = __bind(this.setText, this);
        this.render = __bind(this.render, this);
        TodoView.__super__.constructor.apply(this, arguments);
      }

      TodoView.prototype.template = _.template(todoTmp);

      TodoView.prototype.events = {
        'click .check': 'toggleDone',
        'dblclick div.todo-text': 'edit',
        'click span.todo-destroy': 'clear',
        'keypress .todo-input': 'updateOnEnter'
      };

      TodoView.prototype.tagName = 'li';

      TodoView.prototype.initialize = function() {
        this.model.bind('change', this.render);
        return this.model.bind('destroy', this.remove);
      };

      TodoView.prototype.render = function() {
        $(this.el).html(this.template(this.model.toJSON()));
        this.setText(this.model.get('text'));
        return this;
      };

      TodoView.prototype.setText = function(text) {
        this.$('.todo-text').text(text);
        this.input = this.$('.todo-input');
        this.input.bind('blur', this.close);
        return this.input.val(text);
      };

      TodoView.prototype.toggleDone = function() {
        return this.model.toggle();
      };

      TodoView.prototype.edit = function() {
        console.log("edit");
        return $(this.el).removeClass('editing');
      };

      TodoView.prototype.updateOnEnter = function(e) {
        if (e.keycode = 13) return this.close();
      };

      TodoView.prototype.close = function() {
        this.model.save({
          text: this.input.val()
        });
        return $(this.el).removeClass(editing);
      };

      TodoView.prototype.remove = function() {
        return $(this.el).remove();
      };

      TodoView.prototype.clear = function() {
        return this.model.destroy();
      };

      return TodoView;

    })(Backbone.View);
    return module;
  });

}).call(this);
