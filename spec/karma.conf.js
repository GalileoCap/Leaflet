var pkg= require('../package.json');

var json = require('rollup-plugin-json');

const outro = `window.${pkg.name}= exports; `; //XXX: Coordinar con build/rollup-config.js
	
// Karma configuration
module.exports = function (config) {

// 	var libSources = require(__dirname + '/../build/build.js').getFiles();

	var files = [
		"src/"+pkg.name+".js",
		"spec/after.js",
		"node_modules/happen/happen.js",
		"node_modules/prosthetic-hand/dist/prosthetic-hand.js",
		"spec/suites/*.test.js",
		//"dist/*.css",
		//{pattern: "dist/images/*.png", included: false, serve: true}
	];

	var preprocessors = {};

	if (config.cov) {
		preprocessors['src/*.js'] = ['coverage'];
	}

	preprocessors['src/'+pkg.name+'.js'] = ['rollup'];

	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '../',

		plugins: [
			'karma-nicer-reporter',
			'karma-htmlfile-reporter',
			'karma-rollup-preprocessor',
			'karma-mocha',
			'karma-sinon',
			'karma-expect',
			'karma-coverage',
			'karma-phantomjs-launcher',
			'karma-chrome-launcher',
			'karma-safari-launcher',
			'karma-firefox-launcher'],

		// frameworks to use
		frameworks: ['mocha', 'sinon', 'expect'],

		// list of files / patterns to load in the browser
		files: files,
		proxies: {
			'/base/dist/images/': 'dist/images/'
		},
		exclude: [],

		// Rollup the ES6 Leaflet sources into just one file, before tests
		preprocessors: preprocessors,
		rollupPreprocessor: {
			plugins: [
				json()
			],
			format: 'umd',
			name: pkg.name,
			outro: outro
		},

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: config.cov ? ['nicer', 'html', 'coverage'] : ['nicer', 'html'],

		coverageReporter: config.cov ? {type : 'html', dir : 'coverage/'} : null,

		htmlReporter: {
      outputFile: 'coverage/tests_report.html',
            
      // Optional
      pageTitle: 'Karma Tests',
      subPageTitle: 'DESCRIPCION',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true,
      showOnlyFailed: false
    },

		// web server port
		port: 9876,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_WARN,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJSCustom'],

		customLaunchers: {
			'PhantomJSCustom': {
				base: 'PhantomJS',
				flags: ['--load-images=true'],
				options: {
					onCallback: function (data) {
						if (data.render) {
							page.render(data.render);
						}
					}
				}
			}
		},

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 5000,

		// Workaround for PhantomJS random DISCONNECTED error
		browserDisconnectTimeout: 10000, // default 2000
		browserDisconnectTolerance: 1, // default 0

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};
