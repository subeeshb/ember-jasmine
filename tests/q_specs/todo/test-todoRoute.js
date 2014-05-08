moduleFor('route:todo', 'Unit: route/todo');

test('Route model returns an array of App.TodoModel objects', function() {
	var route = this.subject();
	var model = route.model();

	ok(model instanceof Array, 'Model is an array');
	ok(model.every(function(obj) {
		return obj instanceof App.TodoModel;
	}), 'All items in array are of type TodoModel');
})