Ember-Jasmine
=============

Unit test helpers for Ember.js using Jasmine.

About
-----

Ember-Jasmine uses your application's resolver to find and automatically create test subjects for you with additional helpers. This project is based on Ember QUnit.

Helpers
-------

```
describeApp(fullName, description, function() {
	//test cases
})
```

- `fullName`: (String) - The full name of the unit, ie
  `controller:application`, `route:index`.

- `description`: (String) - The description of the suite


```
describeComponent(componentName, description, function() {
	//test cases
})
```

- `componentName`: (String) - The short name of the component that you'd use in a
  template, ie `x-foo`, `ic-tabs`, etc.

- `description`: (String) - The description of the suite


```
describeModel(modelName, description, function() {
	//test cases
})
```

- `modelName`: (String) - The short name of the model you'd use in `store`
  operations ie `user`, `assignmentGroup`, etc.

- `description`: (String) - The description of the suite


Usage
-----

Include the `ember-jasmine.js` file when running tests. Inject test helpers into the global namespace using the `emberjasmine.globalize()` function. The full setup should look something like this:

```
emberjasmine.globalize();
App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();
setResolver(Ember.DefaultResolver.create({ namespace: App }));
```

Refer to the `tests/vendor/ember-jasmine-setup.js` file in the sample app for an example.


Sample code
-----------

The sample app in this project demonstrates how the helpers can be used. Refer to the test specs in the `tests/specs` folder, or checkout and run the sample app's tests using Karma.


Contribution
------------

This is a work in progress and may not be entirely stable yet. Feedback and contributions are highly welcome.


License
-------
This software is licensed under the MIT License.
