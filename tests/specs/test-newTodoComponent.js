describeComponent('new-todo', 'new-todo component', function() {

	it('Check that component has an input field and a button', function() {
		var component = this.subject();
		var $component = this.append();

		expect($component.find('input')).toBeDefined();
		expect($component.find('button')).toBeDefined();
		expect($component.find('button').text()).toBe('Add');
	})

});