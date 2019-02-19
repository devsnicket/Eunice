const
	{ createWebpackConfiguration } = require("@devsnicket/eunice-test-harnesses"),
	pluginDiscoveryCommonjsBabelPlugin = require("@devsnicket/plugin-discovery-commonjs-babel-plugin");

module.exports =
	({
		babelPlugins = [],
		contentFromFile,
		outputDirectoryName,
	}) => (
		{
			...createWebpackConfiguration({
				babelPlugins:
					[
						[
							pluginDiscoveryCommonjsBabelPlugin,
							...babelPlugins,
						],
					],
				contentFromFile,
				directory:
					`${__dirname}/../output/${outputDirectoryName}`,
				indexFile:
					"./index.js",
			}),
			// Work around for renderer harness that requires @ungap/url-search-params using ES (which needs to specify default) instead of CommonJS (which does not and is used by tests).
			resolve:
				{ mainFields: [ "main", "module" ] },
		}
	);