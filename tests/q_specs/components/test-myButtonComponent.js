moduleForComponent('my-button');

//test parameters
var PARAMS = {
	BEFORE: 'before_text',
	AFTER: 'after_text'
};

test('check that button text changes when clicked', function() {
	var component = this.subject();
	var $component = this.append();  //append to the DOM

	Ember.run(function() {
		component.set('buttonText', PARAMS.BEFORE);
		component.set('afterValue', PARAMS.AFTER);
	});

	$component.find('input').click();

	equal(component.get('buttonText'), PARAMS.AFTER);
});

test('check that button text can be toggled repeatedly', function() {
	var component = this.subject();
	var $component = this.append();  //append to the DOM

	Ember.run(function() {
		component.set('buttonText', PARAMS.BEFORE);
		component.set('afterValue', PARAMS.AFTER);
	});

	for(i=0; i<10; i++) {
		var expectedValue = (i % 2 == 0) ? PARAMS.AFTER : PARAMS.BEFORE;
		$component.find('input').click();
		equal(component.get('buttonText'), expectedValue);
	}
});