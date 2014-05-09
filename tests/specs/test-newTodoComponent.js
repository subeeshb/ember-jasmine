describeComponent('new-todo', 'new-todo component', function() {

	it('Check that component has an input field and a button', function() {
		var component = this.subject();
		var $component = this.append();

		expect($component.find('input')).toBeDefined();
		expect($component.find('button')).toBeDefined();
		expect($component.find('button').text()).toBe('Add');
	});

	it('Check that input field is bound to property in component', function() {
		var component = this.subject();
		var $component = this.append();
		var TEST_INPUT_VAL = 'testinput123';

		fillIn($component.find('input'), TEST_INPUT_VAL);

		expect(component.get('title')).toBe(TEST_INPUT_VAL)
	});

});