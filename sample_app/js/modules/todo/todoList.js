// SAMPLE DATA

var sampleTodoData = {
	"taskList":[
		{
			"taskName":"Do something.",
			"isComplete": true
		},
		{
			"taskName":"Do something else.",
			"isComplete":false
		}
	]
};


// OBJECT MODEL

App.TodoModel = Ember.Object.extend({
	taskName: '',
	isComplete: false,
	toggleCompleted: function() {
		this.set('isComplete', !this.get('isComplete'));
	}
});

// COMPONENTS

App.NewTodoComponent = Ember.Component.extend({
	title: '',
	actions: {
		createTodo: function() {
			console.log('Creating new todo...');
			var self = this;
			var newTodo = App.TodoModel.create({
				taskName: self.get('title')
			});
			console.log('Invoking onCreate action...');
			this.sendAction('onCreate', newTodo);
		}
	}
});


App.TodoListComponent = Ember.Component.extend({
	actions: {
		deleteItem: function(item) {
			console.log('deleteItem');
			this.sendAction('onDelete', item);
		},
		toggleCompleted: function(item) {
			console.log('toggleCompleted');
			item.toggleCompleted();
		}
	}
});


// CONTROLLER / ROUTE

App.TodoRoute = Ember.Route.extend({
  model: function() {
    return sampleTodoData.taskList.map(function(todoItem) {
    	return App.TodoModel.create(todoItem);
    });
  }
});

App.TodoController = Ember.Controller.extend({
  actions: {
  		newTodoAdded: function(todoItem) {
  			console.log('newTodoAdded action triggered');
  			this.get('model').pushObject(todoItem);
  		},
  		todoItemDeleted: function(todoItem) {
  			this.get('model').removeObject(todoItem);
  		}
  }
});