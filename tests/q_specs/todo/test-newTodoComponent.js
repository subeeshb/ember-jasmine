moduleForComponent('new-todo');

test('Check that component has an input field and a button', function() {
	var component = this.subject();
	var $component = this.append();

	ok($component.find('input'));
	ok($component.find('button'));
	equal($component.find('button').text(), 'Add');
});

test('Check that input field is bound to property in component', function() {
	var component = this.subject();
	var $component = this.append();
	var TEST_INPUT_VAL = 'testinput123';

	fillIn($component.find('input'), TEST_INPUT_VAL);

	equal(component.get('title'), TEST_INPUT_VAL);
});