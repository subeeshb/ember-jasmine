describeApp('controller:todo', 'Todo Controller', function() {

	var testTodoItem = App.TodoModel.create({
		"taskName":"Test Item",
		"isComplete": false
	});


	it('newTodoAdded action adds a new item to the model', function() {
		var ctrl = this.subject();

		Ember.run(function() {
			ctrl.set('model', []);
		});

		ctrl.send('newTodoAdded', testTodoItem);

		expect(ctrl.get('model').length).toBe(1);
		expect(ctrl.get('model.0') instanceof App.TodoModel).toBe(true);
	});

	it('todoItemDeleted action removes a todo item from the model', function() {
		var ctrl = this.subject();

		Ember.run(function() {
			ctrl.set('model', [testTodoItem]);
		});

		ctrl.send('todoItemDeleted', testTodoItem);
		expect(ctrl.get('model').length).toBe(0);
	})
});

