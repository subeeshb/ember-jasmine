//utility method for ajax calls
function ajax(url, options) {
  return new Ember.RSVP.Promise(function(resolve, reject){
    options = options || {};
    options.url = url;

    options.success = function(data) {
      Ember.run(null, resolve, data);
    };

    options.error = function(jqxhr, status, something) {
      Ember.run(null, reject, arguments);
    };

    Ember.$.ajax(options);
  });
}

App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.route('page2', { path: '/page2' });
  this.route('todo', { path: '/todo' });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.IndexController = Ember.ObjectController.extend({
  window: window
});

App.MyButtonComponent = Ember.Component.extend({
  beforeText: null,
	actions: {
		changeValue: function(e) {
      if(!this.get('beforeText')) {
        this.set('beforeText', this.get('buttonText'));
      }
      var newValue = (this.get('buttonText') === this.get('beforeText')) ? this.get('afterValue') : this.get('beforeText');
			this.set('buttonText', newValue);
		}
	}
});

App.NameInputComponent = Ember.Component.extend({
  nameValue: '',
  greeting: '',

  actions: {
    showGreeting: function(e) {
      this.set('greeting', 'Hello ' + this.get('nameValue'));
    }
  }
});


App.Page2Route = Ember.Route.extend({
  model: function() {
    return ['AAA', 'BBB', 'CCC'];
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.getData();
  }
});

App.Page2Controller = Ember.Controller.extend({
  page2_title:"This is page2.",
  items: [],
  actions: {
    changeTitle: function() {
      this.set('page2_title', 'Changed');
    }
  },
  getData: function() {
    var url = "/data.json";
    ajax(url).then(function(data) {
      data.items.forEach(function(c) {
        this.set('items', data.items);
      }.bind(this));
    }.bind(this));
  }
});

