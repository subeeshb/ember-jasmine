Ember Integration testing POC
=============================

Installing Node and NPM in SCB Laptop
---------------


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


Running tests using QUnit
-------------------------

```
$ grunt dev
```

The above command will build the app and inject a QUnit runner script and libraries. Run the tests by going to http://localhost:9999/?test

The grunt task above will also watch for changes to scripts and test cases and automatically build the app when changes are made.

In this mode, navigate to http://localhost:9999/?test to run tests. After you have made changes, refresh the page to rerun the tests against the updated code without having to run grunt again. 


Running tests using Karma
-------------------------

```
$ grunt dist
```

Run the command above to build and run the tests using the Karma test runner. By default, tests will be executed in PhantomJS (configurable in the karma.conf.js file). Karma will generate the following output:

* A test results summary at ./tests/results/results.html
* A code coverage report at ./tests/results/[browser name]/index.html

Running single test cases
-------------------------

This POC includes the qunit-karma-launcher plugin. This adds omodule(), otest(), oasyncTest() functions to run only specific modules or tests respectively. To run only one test case in a file, change the test() function to otest().

For example, changing 

```
test("check routing to page 2", function() { ...
```

to 

```
otest("check routing to page 2", function() { ...
```

will run this test case only, ignoring all other test cases.


Editing app code and test cases
-------------------------------

The test cases are defined in various files under the *./tests/specs* folder. All core application logic is in *./js/app.js*. The sample todo list app is implemented in *./js/modules/todo/todoList.js*. 

To change the Karma configuration, edit *./karma.conf.js*.
