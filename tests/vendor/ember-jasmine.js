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
  return container;
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

function describeApp(fullName, description, specDefinitions, delegate) {
  // var container;
  jasmine.getEnv().beforeEach(function() {
    if (Ember.$('#ember-testing').length === 0) {
      Ember.$('<div id="ember-testing"/>').appendTo(document.body);
    }

    var needs = [fullName].concat(specDefinitions.needs || []);
    container = isolatedContainer(needs);

    specDefinitions.subject = specDefinitions.subject || defaultSubject;

    function factory() {
      return container.lookupFactory(fullName);
    }

    context = {
      container:            container,
      factory:              factory,
      dispatcher:           null,
      __setup_properties__: specDefinitions
    };

    if (delegate) {
      delegate(container, context, defaultSubject);
    }
    console.debug(fullName);
    console.debug('A');
    console.debug(context.__setup_properties__.append);
    buildContextVariables(context);
    console.debug('B');
    console.debug(context.__setup_properties__.append);
    context.append = context.__setup_properties__.append;
    specDefinitions.context = context;
  });

  jasmine.getEnv().afterEach(function() {
    Ember.run(function(){
      container.destroy();
      
      if (context.dispatcher) {
        context.dispatcher.destroy();
      }
    });

    // if(specDefinitions.afterEach) {
    //   specDefinitions.afterEach.call(context, container);
    // }

    Ember.$('#ember-testing').remove();
    App.reset();
  });
  return jasmine.getEnv().describe(description, specDefinitions);
}

function describeComponent(name, description, specDefinitions) {
  return describeApp('component:'+name, description, specDefinitions, function(container, context, defaultSubject) {
    var layoutName = 'template:components/' + name;

    var layout = resolver.resolve(layoutName);

    if (layout) {
      container.register(layoutName, layout);
      container.injection('component:' + name, 'layout', layoutName);
    }

    context.dispatcher = Ember.EventDispatcher.create();
    context.dispatcher.setup({}, '#ember-testing');
    context.__setup_properties__.append = function(selector) {
      var containerView = Ember.ContainerView.create({container: container});
      var view = Ember.run(function(){
        var subject = context.subject();
        containerView.pushObject(subject);
        // TODO: destory this somewhere
        containerView.appendTo('#ember-testing');
        return subject;
      });

      return view.$();
    };
    context.__setup_properties__.$ = context.__setup_properties__.append;
  });
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