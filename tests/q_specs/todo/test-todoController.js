moduleFor('controller:todo', 'Todo Controller');

var testTodoItem = App.TodoModel.create({
	"taskName":"Test Item",
	"isComplete": false
});

test('newTodoAdded action adds a new item to the model', function() {
	var ctrl = this.subject();

	Ember.run(function() {
		ctrl.set('model', []);
	});

	ctrl.send('newTodoAdded', testTodoItem);

	equal(ctrl.get('model').length, 1, 'Model contains item');
	ok(ctrl.get('model.0') instanceof App.TodoModel, 'Item in model is of type App.TodoModel');
});

test('todoItemDeleted action removes a todo item from the model', function() {
	var ctrl = this.subject();

	Ember.run(function() {
		ctrl.set('model', [testTodoItem]);
	});

	ctrl.send('todoItemDeleted', testTodoItem);
	equal(ctrl.get('model').length, 0, 'Item is removed from model');
});