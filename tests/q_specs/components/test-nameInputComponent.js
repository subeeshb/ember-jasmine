moduleForComponent('name-input');

test('check that greeting is correct', function() {
	var component = this.subject();
	var INPUT_NAME = 'Test123';
	var EXPECTED_OUTPUT = 'Hello Test123';

	Ember.run(function() {
		component.set('nameValue', INPUT_NAME);
		component._actions.showGreeting.call(component);
	});

	equal(component.get('greeting'), EXPECTED_OUTPUT);
})