var qunit__teststack = [];
 
// If this flag is set, only the marked tests will be run
// Otherwise all tests will be run
var qunit__exclusive = false;
 
// While this flag is set, all tests will be marked as exclusive
var qunit__insideExclusiveModule = false;
 
function asyncTest() {
  qunit__saveFunc(QUnit.asyncTest, arguments, qunit__insideExclusiveModule);
}
 
function test() {
  qunit__saveFunc(QUnit.test, arguments, qunit__insideExclusiveModule);
}
 
function module() {
  qunit__insideExclusiveModule = false;
  qunit__saveFunc(QUnit.module, arguments, true);
}
 
 
function omodule() {
  qunit__exclusive = true;
  qunit__insideExclusiveModule = true;
  qunit__saveFunc(QUnit.module, arguments, true);
}
 
function otest() {
  qunit__exclusive = true;
  qunit__saveFunc(QUnit.test, arguments, true);
}
 
function oasyncTest() {
  qunit__exclusive = true;
  qunit__saveFunc(QUnit.asyncTest, arguments, true);
}
 
function qunit__saveFunc(func, args, run) {
  qunit__teststack.push({func: func, args: args, run: run});
}
 
function qunit__launch() {
  var i,l,test;
 
  for(i = 0, l = qunit__teststack.length; i < l; i++) {
    test = qunit__teststack[i];
    if (!qunit__exclusive || test.run) test.func.apply(window, test.args);
  }
}


//set up Ember-QUnit
emq.globalize();

//init for testing
if (window.location.search.indexOf("?test") === -1) {
  //karma
  document.write(
    '<div id="qunit"></div>' +
    '<div id="qunit-fixture"></div>' +
    '<div id="ember-testing-container" style="visibility: hidden;">' +
    '<div id="ember-testing"></div>' +
    '</div>'
    );
}

App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();
setResolver(Ember.DefaultResolver.create({ namespace: App }));

