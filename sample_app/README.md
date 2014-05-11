Ember-Jasmine sample app
========================

This sample app demonstrates how ember-jasmine is used to write unit tests for Ember.


Getting started
---------------

Node.JS is required to install dependencies and run the app. Ensure that Grunt and Karma have been installed globally. If not, run the following commands:

```
$ npm install -g grunt-cli

$ npm install -g karma
```

Then install the project dependencies by running this command in the project folder.

```
$ npm install
```


Building the app
----------------

Build the project and start a server by running the following command:

```
$ grunt server
```

This will build the app to the dist folder and start a server. Open the app in your browser by going to http://localhost:9999



Running tests using Karma
-------------------------

```
$ grunt dist
```

Run the command above to build and run the tests using the Karma test runner. By default, tests will be executed in PhantomJS (configurable in the karma.conf.js file). Karma will generate the following output:

* A test results summary at ./tests/results/results.html
* A code coverage report at ./tests/results/[browser name]/index.html


Editing app code and test cases
-------------------------------

The test cases are defined in various files under the *./tests/specs* folder. All core application logic is in *./js/app.js*. The sample todo list app is implemented in *./js/modules/todo/todoList.js*. 

To change the Karma configuration, edit *./karma.conf.js*.
