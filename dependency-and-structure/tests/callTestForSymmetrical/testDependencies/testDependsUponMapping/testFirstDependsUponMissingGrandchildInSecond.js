/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	test =>
		test({
			stack:
				createStack(),
			stackDescription:
				"first depends upon missing grandchild in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id:
									"second",
								items:
									{
										id: "childOfSecond",
										items: "missingGrandchild",
									},
							},
						id:
							"first",
					}),
					createItemYaml({
						id: "second",
						items: "childOfSecond",
					}),
				],
		});

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "first" },
					{
						id: "second",
						items: [ [ { id: "childOfSecond" } ] ],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		const childOfSecond = second.items[0][0];

		first.dependsUpon =
			[ {
				ancestors: [ childOfSecond, second ],
				item: "missingGrandchild",
				itemOrFirstAncestorItem: childOfSecond,
			} ];

		childOfSecond.dependents = [ first ];
	}
}