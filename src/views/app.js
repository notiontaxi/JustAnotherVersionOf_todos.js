(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['text!templates/app/stats.tmp'], function(statsTemp) {
    var AppView, module;
    module = function() {};
    module.create = function(properties) {
      return new AppView(properties);
    };
    AppView = (function(_super) {

      __extends(AppView, _super);

      function AppView() {
        this.addAll = __bind(this.addAll, this);
        this.render = __bind(this.render, this);
        AppView.__super__.constructor.apply(this, arguments);
      }

      AppView.prototype.buildStats = _.template(statsTemp);

      AppView.prototype.events = {
        'keypress #new-todo': 'createOnEnter',
        'keyup #new-todo': 'showTooltip',
        'click .todo-clear a': 'clearCompleted'
      };

      AppView.prototype.el = $('#todoapp');

      AppView.prototype.initialize = function(properties) {
        this.collection = properties.collection;
        this.input = this.$('#new-todo');
        this.collection.bind('add', this.addOne);
        this.collection.bind('reset', this.addAll);
        this.collection.bind('all', this.render);
        return this.collection.fetch();
      };

      AppView.prototype.render = function() {
        var done, remaining, total;
        total = this.collection.length;
        done = this.collection.getDoneElements().length;
        remaining = total - done;
        return $('#todo-stats').html(this.buildStats({
          total: total,
          done: done,
          remaining: remaining
        }));
      };

      AppView.prototype.addOne = function(todo) {
        var _this = this;
        return require(['views/todo'], function(todoView) {
          var view;
          view = todoView.create({
            model: todo
          });
          return $('#todo-list').append(view.render().el);
        });
      };

      AppView.prototype.addAll = function() {
        return this.collection.each(this.addOne);
      };

      AppView.prototype.createOnEnter = function(e) {
        var text;
        text = this.input.val();
        if ((e.keyCode === 13) && (!!text)) {
          this.collection.create({
            text: text
          });
          return this.input.val('');
        }
      };

      AppView.prototype.clearCompleted = function() {
        _.each(this.collection.getDoneElements(), function(todo) {
          return todo.destroy();
        });
        return false;
      };

      AppView.prototype.showTooltip = function(e) {
        var show, tooltip, val;
        tooltip = this.$('.ui-tooltip-top');
        val = this.input.val();
        tooltip.fadeOut();
        if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
        if (!(val === '' || val === this.input.attr('placeholder'))) {
          show = function() {
            return tooltip.show().fadeIn();
          };
          return this.tooltipTimeout = _.delay(show, 1000);
        }
      };

      return AppView;

    })(Backbone.View);
    return module;
  });

}).call(this);
