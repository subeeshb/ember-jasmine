describeApp('route:todo', 'Unit: route/todo', function() {

	it('Route model returns an array of App.TodoModel objects', function() {
		var route = this.subject();
		var model = route.model();

		expect(model instanceof Array).toBe(true);
		expect(model.every(function(obj) {
			return obj instanceof App.TodoModel;
		})).toBe(true);
	});

});