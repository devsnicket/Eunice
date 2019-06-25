/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	test => {
		const stack = createStackFromLevels([ [ { id: "item" } ] ]);

		stack[0][0].dependsUpon =
			[
				{
					ancestors: [ "missingParent" ],
					item: "missingChild",
				},
			];

		test({
			stack,
			stackDescription:
				"depends upon missing child in missing parent",
			yaml:
				createItemYaml({
					dependsUpon:
						{
							id: "missingParent",
							items: "missingChild",
						},
					id:
						"item",
				}),
		});
	};