// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	fs = require("fs"),
	path = require("path"),
	{ promisify } = require("util");

const readFile = promisify(fs.readFile);

const
	getOrCreateItemsInDirectory = require("."),
	getYamlForItemOrItems = require("../getYamlForItemOrItems");

const testCasesDirectory = path.join(__dirname, "test-cases");

test(
	"Valid JavaScript files return expected YAML",
	async() => {
		const supportedTestCasesDirectory =
			path.join(
				testCasesDirectory,
				"valid",
			);

		expect(
			getYamlForItemOrItems(
				await getOrCreateItemsInDirectory({
					directory:
						supportedTestCasesDirectory,
					ignorePathPattern:
						new RegExp(`^(node_modules|ignoredSubdirectory\\${path.sep}ignoredSubdirectoryOfSubdirectory|ignored\\.js)`),
				}),
			),
		)
		.toBe(
			await readExpectedFile(),
		);

		async function readExpectedFile() {
			const fileName = "expected.yaml";

			return (
				getWithPathSeparator(
					await readFile(
						path.join(supportedTestCasesDirectory, fileName),
						"utf-8",
					),
				)
			);

			function getWithPathSeparator(
				expected,
			) {
				if (expected.includes("\\"))
					throw new Error(`${fileName} must contain forward not back slashes.`);
				else
					return expected.replace(/\//g, path.sep);
			}
		}
	},
);

test(
	"File with not supported declaration throws error with file path",
	async() =>
		(
			await expect(
				getOrCreateItemsInDirectory(
					{ directory: path.join(testCasesDirectory, "invalid") },
				),
			)
		)
		.rejects
		.toThrowError(
			"Analysis of file \"index.js\" raised the following error.\n\nUnexpected token (1:1)",
		),
);