// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	createTestItemWithIdentifier = require("../createTestItemWithIdentifier"),
	getExisting = require(".");

const
	leftInTarget = createTestItemWithIdentifier("leftInTarget"),
	lowerInTarget = createTestItemWithIdentifier("lowerInTarget"),
	lowerNotInTarget = createTestItemWithIdentifier("lowerNotInTarget"),
	rightInTarget = createTestItemWithIdentifier("rightInTarget"),
	upperInTarget = createTestItemWithIdentifier("upperInTarget"),
	upperNotInTarget = createTestItemWithIdentifier("upperNotInTarget");

test.each(
	[
		[
			{
				identifierOrItemOrLevelOrStack: null,
				targetLevelOrStack: null,
			},
			null,
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ leftInTarget, rightInTarget ],
				targetLevelOrStack: [ "leftInTarget", "rightInTarget" ],
			},
			null,
		],
		[
			{
				identifierOrItemOrLevelOrStack: "notInTarget",
				targetLevelOrStack: [ ],
			},
			"notInTarget",
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ [ upperNotInTarget ], lowerNotInTarget ],
				targetLevelOrStack: [ ],
			},
			[ [ upperNotInTarget ], [ lowerNotInTarget ] ],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ [ upperInTarget ], lowerInTarget ],
				targetLevelOrStack: [ "upperInTarget", "lowerInTarget" ],
			},
			null,
		],
	],
)(
	"%j returns %j",
	(
		{ identifierOrItemOrLevelOrStack, targetLevelOrStack },
		existing,
	) =>
		expect(
			getExisting({
				identifierOrItemOrLevelOrStack,
				targetLevelOrStack,
			}),
		)
		.toEqual(existing),
);