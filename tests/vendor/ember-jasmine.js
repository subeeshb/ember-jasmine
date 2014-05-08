var resolver;
var context;

function setResolver(res) {
  resolver = res;
}

function isolatedContainer(fullNames) {
  var container = new Ember.Container();
  container.optionsForType('component', { singleton: false });
  container.optionsForType('view', { singleton: false });
  container.optionsForType('template', { instantiate: false });
  container.optionsForType('helper', { instantiate: false });
  container.register('component-lookup:main', Ember.ComponentLookup);
  for (var i = fullNames.length; i > 0; i--) {
    var fullName = fullNames[i - 1];
    container.register(fullName, resolver.resolve(fullName));
  }
  return container;s
}

function buildContextVariables(context) {
  var cache     = { };
  var callbacks = context.__setup_properties__;
  var container = context.container;
  var factory   = context.factory;
    
  Ember.keys(callbacks).filter(function(key){
    // ignore the default setup/teardown keys
    return key !== 'setup' && key !== 'teardown';
  }).forEach(function(key){
    context[key] = function(options) {
      if (cache[key]) { return cache[key]; }

      var result = callbacks[key](options, factory(), container);
      cache[key] = result;
      return result;
    };
  });
}

function resetViews() {
  Ember.View.views = {};
}

function defaultSubject(options, factory) {
  return factory.create(options);
}

function describeApp(fullName, description, specDefinitions) {
  // var container;

  jasmine.getEnv().beforeEach(function() {
    var needs = [fullName].concat(specDefinitions.needs || []);
    container = isolatedContainer(needs);


    function factory() {
      return container.lookupFactory(fullName);
    }

    context = {
      container:            container,
      factory:              factory,
      dispatcher:           null,
      __setup_properties__: specDefinitions
    };

    if (Ember.$('#ember-testing').length === 0) {
      Ember.$('<div id="ember-testing"/>').appendTo(document.body);
    }

    buildContextVariables(context);
    specDefinitions.context = context;
    specDefinitions.subject = specDefinitions.subject || defaultSubject;
  });

  return jasmine.getEnv().describe(description, specDefinitions);
}

function it(desc, func) {
  function wrapper() {    
    resetViews();
    var result = func.call(context);

    // function failTestOnPromiseRejection(reason) {
    //   ok(false, reason);
    // }

    // Ember.run(function(){
    //   stop();
    //   Ember.RSVP.Promise.cast(result)['catch'](failTestOnPromiseRejection)['finally'](start);
    // });
  }

  return jasmine.getEnv().it(desc, wrapper);
}



// function globalize() {
//   window.describeFromContainer = describeFromContainer;
//   // window.moduleForComponent = moduleForComponent;
//   // window.moduleForModel = moduleForModel;
//   // window.test = test;
//   window.setResolver = setResolver;
// }