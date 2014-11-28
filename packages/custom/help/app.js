'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Help = new Module('help');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Help.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Help.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Help.menus.add({
        title: 'help example page',
        link: 'help example page',

        menu: 'main'
    });

    Help.aggregateAsset('css', 'help.css');

    // Override Layout
     //app.set('views', __dirname + '/server/views');

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Help.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Help.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Help.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Help;
});