// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createItemYaml = require("../../../createItemYaml"),
	createStackFromLevels = require("../../../createStackFromLevels");

module.exports =
	/** @type {import("../../Parameter.d")} */
	({
		getActual,
		getExpected,
		getName,
	}) => {
		const
			stack =
				createStack(),
			yaml =
				[
					createItemYaml({
						dependsUpon:
							{
								id: "second",
								items: "missing",
							},
						id:
							"first",
					}),
					"second",
				];

		test(
			getName({
				stackDescription:
					"first depends upon missing child in second",
				yaml,
			}),
			() =>
				expect(
					getActual({ stack, yaml }),
				)
				.toEqual(
					getExpected({ stack, yaml }),
				),
		);
	};

function createStack() {
	const stack =
		createStackFromLevels(
			[
				[
					{ id: "first" },
					{ id: "second" },
				],
			],
		);

	addDependencies();

	return stack;

	function addDependencies() {
		const [ first, second ] = stack[0];

		first.dependsUpon =
			[ {
				ancestors: [ second ],
				item: "missing",
				itemOrFirstAncestorItem: second,
			} ];

		second.dependents = [ first ];
	}
}