const path = require("path");

const
	getYamlFromJavaScript = require("."),
	runTestsInFileSystem = require("../../../Tests/runTestsInFileSystem");

runTestsInFileSystem({
	action: getYamlFromJavaScript,
	caseFileName: ".js",
	directory: path.join(__dirname, "testcases/"),
	expectedFileName: ".yaml",
	processArguments: process.argv,
});