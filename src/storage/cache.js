// Cache Primer
// ----------

define(['text!storage/manifest.appcache'], function (appCache) {     
    'use strict';
    
    var getFiles = function () {
        var lines = appCache.split('\n'), files = [];        
        _.each(lines, function(line){ if (line.indexOf('CACHE') === -1) files.push(line) });         
        return files;                               
    };
    
    var xhrPrime = function () {
        var interval, count = 0;
        
        var fetch = function () {
            _.each(getFiles(), function(file){ $.ajax({ url : file, dataType : 'html' }); });  // if dataType !html then $ processes scripts                            
        };
        
        setTimeout(function () { fetch(); }, 5000); // give app. time to load; then prime cache               
    };
        
    var module = {};  
    module.prime = function (xhr) { 
        if (window.applicationCache) { // if app cache has changed then reload page
            window.addEventListener('load', function (e) {
                window.applicationCache.addEventListener('updateready', function (e) {
                    window.location.reload();
                }, false);
            }, false);                        
        } else if (xhr) { // prime cache via XHR
            xhrPrime();                 
        }                                              
    };  
    
    return module;
});