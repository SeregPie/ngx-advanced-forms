module.exports = function (config) {
	config.set({
		autoWatch: true,
		basePath: '',
		browsers: ['Chrome'],
		client: {
			clearContext: false,
		},
		colors: true,
		coverageReporter: {
			dir: require('path').join(__dirname, '../../coverage/lib'),
			reporters: [{type: 'html'}, {type: 'text-summary'}],
			subdir: '.',
		},
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		jasmineHtmlReporter: {
			suppressAll: true,
		},
		logLevel: config.LOG_INFO,
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage'),
			require('@angular-devkit/build-angular/plugins/karma'),
		],
		port: 9876,
		reporters: ['progress', 'kjhtml'],
		restartOnFileChange: true,
		singleRun: false,
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
	});
};
