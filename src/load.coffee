require.config({
  baseUrl: './src/lib',
  paths:{
    'root' : '../../',
    'storage' : '../storage',
    'collections' : '../collections',
    'views' : '../views',
    'models' : '../models',
    'templates' : '../templates'
    }	
  })

require(['order!jquery-1.6.4', 'storage/cache'])

require(['underscore'], (_) ->  
  window._ = _
  require ['order!json2', 'order!backbone', 'order!storage/backbone-localstorage', 'order!src/app.js'], (a, b, c, app) -> 
    app.init()
  )
