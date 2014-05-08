window.isTestModeEnabled = true;

if (window.location.search.indexOf("?test") !== -1) {
    document.write(
        '<div id="qunit"></div>' +
        '<div id="qunit-fixture"></div>' +
        '<div id="ember-testing-container"  style="visibility: hidden;">' +
        '<div id="ember-testing"></div>' +
        '</div>' +
        '<link rel="stylesheet" href="tests/runner.css">' +
        '<link rel="stylesheet" href="tests/vendor/qunit-1.12.0.css">' +
        '<script src="tests/vendor/qunit-1.12.0.js"></script>' +
        '<script src="tests/vendor/ember-qunit-main.js"></script>' +
        '<script src="tests/vendor/qunit-karma-setup.js"></script>'
    );
    
    document.write(
        '<script src="tests/specs.js"></script>' 
    );

    document.write(
        '<script src="tests/vendor/qunit-karma-launch.js"></script>'
    );

}
