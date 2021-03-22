var path = require('path');
var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonFile: path.join( __dirname, '../output/output.json' ),
    output: path.join( __dirname, '../output/cucumber_report.html' ),
    reportSuiteAsScenarios: true,
    launchReport: true,
    metadata: {
        "App Version":"2",
        "Test Environment": "Staging",
        
    }
};


reporter.generate(options);
process.exit();