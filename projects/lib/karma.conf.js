process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
	config.set({
		autoWatch: false,
		basePath: '',
		browsers: ['ChromeHeadlessCI'],
		customLaunchers: {
			ChromeHeadlessCI: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox'],
			},
		},
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
		singleRun: true,
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
	});
};
