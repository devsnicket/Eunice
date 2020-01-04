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
				"first depends upon two grandchildren in two children in second",
			yaml:
				[
					createItemYaml({
						dependsUpon:
							{
								id:
									"second",
								items:
									[
										{
											id: "firstChildOfSecond",
											items: "firstGrandchildOfSecond",
										},
										{
											id: "secondChildOfSecond",
											items: "secondGrandchildOfSecond",
										},
									],
							},
						id:
							"first",
					}),
					createItemYaml({
						id:
							"second",
						items:
							[
								createItemYaml({
									id: "firstChildOfSecond",
									items: "firstGrandchildOfSecond",
								}),
								createItemYaml({
									id: "secondChildOfSecond",
									items: "secondGrandchildOfSecond",
								}),
							],
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
						items:
							[ [
								{
									id: "firstChildOfSecond",
									items: [ [ { id: "firstGrandchildOfSecond" } ] ],
								},
								{
									id: "secondChildOfSecond",
									items: [ [ { id: "secondGrandchildOfSecond" } ] ],
								},
							] ],
					},
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		const
			[
				firstChildOfSecond,
				secondChildOfSecond,
			]
			=
			second.items[0];

		const
			[
				firstGrandchildOfSecond,
				secondGrandchildOfSecond,
			]
			=
			[
				firstChildOfSecond.items[0][0],
				secondChildOfSecond.items[0][0],
			];

		first.dependsUpon =
			[
				{
					ancestors: [ firstChildOfSecond, second ],
					item: firstGrandchildOfSecond,
					itemOrFirstAncestorItem: firstGrandchildOfSecond,
				},
				{
					ancestors: [ secondChildOfSecond, second ],
					item: secondGrandchildOfSecond,
					itemOrFirstAncestorItem: secondGrandchildOfSecond,
				},
			];
		firstGrandchildOfSecond.dependents = [ first ];
		secondGrandchildOfSecond.dependents = [ first ];
	}
}