describeComponent('my-button', 'my-button component', function() {
	var PARAMS = {
		BEFORE: 'before_text',
		AFTER: 'after_text'
	};

	it('should change button text when clicked', function() {
		var component = this.subject();
		var $component = this.append();  //append to the DOM

		Ember.run(function() {
			component.set('buttonText', PARAMS.BEFORE);
			component.set('afterValue', PARAMS.AFTER);
		});

		$component.find('input').click();

		expect(component.get('buttonText')).toBe(PARAMS.AFTER);
	});

	it('should be able to toggle button text repeatedly', function() {
		var component = this.subject();
		var $component = this.append();  //append to the DOM

		Ember.run(function() {
			component.set('buttonText', PARAMS.BEFORE);
			component.set('afterValue', PARAMS.AFTER);
		});

		for(i=0; i<10; i++) {
			var expectedValue = (i % 2 == 0) ? PARAMS.AFTER : PARAMS.BEFORE;
			$component.find('input').click();
			expect(component.get('buttonText')).toBe(expectedValue);
		}
	});
});