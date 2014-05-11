describeComponent('name-input', 'name-input component', function() {
	it('check that greeting is correct', function() {
		var component = this.subject();
		var INPUT_NAME = 'Test123';
		var EXPECTED_OUTPUT = 'Hello Test123';

		Ember.run(function() {
			component.set('nameValue', INPUT_NAME);
			component._actions.showGreeting.call(component);
		});

		expect(component.get('greeting')).toBe(EXPECTED_OUTPUT);
	});
});