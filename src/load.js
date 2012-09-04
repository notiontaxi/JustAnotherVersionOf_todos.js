(function() {

  require.config({
    baseUrl: './src/lib',
    paths: {
      'root': '../../',
      'storage': '../storage',
      'collections': '../collections',
      'views': '../views',
      'models': '../models',
      'templates': '../templates'
    }
  });

  require(['order!jquery-1.6.4', 'storage/cache']);

  require(['underscore'], function(_) {
    window._ = _;
    return require(['order!json2', 'order!backbone', 'order!storage/backbone-localstorage', 'order!src/app.js'], function(a, b, c, app) {
      return app.init();
    });
  });

}).call(this);
