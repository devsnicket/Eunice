const getIdentifierOrItemOrStackLevelOrStack = require(".");

test.each(
	[
		[
			{
				identifierOrItemOrLevelOrStack: null,
				identifiersInNewStack: null,
			},
			null,
		],
		[
			{
				identifierOrItemOrLevelOrStack: "itemNotSpecified",
				identifiersInNewStack: [ "existing" ],
			},
			[ "itemNotSpecified" ],
		],
		[
			{
				addMissing: true,
				identifierOrItemOrLevelOrStack: null,
				identifiersInNewStack: [ "itemMissingAndSpecified" ],
			},
			[ "itemMissingAndSpecified" ],
		],
		[
			{
				identifierOrItemOrLevelOrStack: "itemNotSpecified",
				identifiersInNewStack: [ "itemMissingAndSpecified", "existing" ],
			},
			[ "itemNotSpecified" ],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "itemNotSpecified" ],
				identifiersInNewStack: [ "itemMissingAndSpecified", "existing" ],
			},
			[ "itemNotSpecified" ],
		],
		[
			{
				addMissing: true,
				identifierOrItemOrLevelOrStack: "itemNotSpecified",
				identifiersInNewStack: [ "itemMissingAndSpecified", "existing" ],
			},
			[
				[ "itemMissingAndSpecified" ],
				[ "itemNotSpecified" ],
			],
		],
		[
			{
				addMissing: true,
				identifierOrItemOrLevelOrStack: [ "itemNotSpecified" ],
				identifiersInNewStack: [ "itemMissingAndSpecified", "existing" ],
			},
			[
				[ "itemMissingAndSpecified" ],
				[ "itemNotSpecified" ],
			],
		],
		[
			{
				addMissing:
					true,
				identifierOrItemOrLevelOrStack:
					[ "itemNotSpecified" ],
				identifiersInNewStack:
					[ [ "itemMissingAndSpecified" ], "existing" ],
			},
			[
				[ "itemMissingAndSpecified" ],
				[ "itemNotSpecified" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "itemSpecified", "itemNotSpecified" ],
				identifiersInNewStack: [ "itemMissingAndSpecified", "itemSpecified", "existing" ],
			},
			[
				[ "itemSpecified" ],
				[ "itemNotSpecified" ],
			],
		],
		[
			{
				addMissing: true,
				identifierOrItemOrLevelOrStack: [ "itemSpecified", "itemNotSpecified" ],
				identifiersInNewStack: [ "itemMissingAndSpecified", "itemSpecified", "existing" ],
			},
			[
				[ "itemMissingAndSpecified" ],
				[ "itemSpecified" ],
				[ "itemNotSpecified" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					[
						[ "upperItemSpecified" ],
						"lowerItemSpecified",
					],
				identifiersInNewStack:
					[ "upperItemSpecified", "lowerItemSpecified" ],
			},
			[
				[ "upperItemSpecified" ],
				[ "lowerItemSpecified" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					[
						[ "upperItemSpecified" ],
						"lowerItemNotSpecified",
					],
				identifiersInNewStack:
					[ "upperItemSpecified", "existing" ],
			},
			[
				[ "upperItemSpecified" ],
				"lowerItemNotSpecified",
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					[ "itemNotSpecified", "itemSpecified" ],
				identifiersInNewStack:
					[
						"existing",
						[ "itemSpecified" ],
					],
			},
			[
				[ "itemNotSpecified" ],
				[ "itemSpecified" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					[
						[ "upperItemNotSpecified" ],
						[ "lowerItemNotSpecified" ],
					],
				identifiersInNewStack:
					[ "itemMissingAndSpecified", "existing" ],
			},
			[
				[ "upperItemNotSpecified" ],
				[ "lowerItemNotSpecified" ],
			],
		],
		[
			{
				addMissing:
					true,
				identifierOrItemOrLevelOrStack:
					[
						[ "upperItemNotSpecified" ],
						[ "lowerItemNotSpecified" ],
					],
				identifiersInNewStack:
					[ "itemMissingAndSpecified", "existing" ],
			},
			[
				[ "itemMissingAndSpecified" ],
				[ "upperItemNotSpecified" ],
				[ "lowerItemNotSpecified" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "item1", "item2" ],
				identifiersInNewStack: [ [ "item1", "item2" ] ],
			},
			[ [ "item1", "item2" ] ],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "item1", "item2" ],
				identifiersInNewStack: [ "item1", "item2" ],
			},
			[
				[ "item1" ],
				[ "item2" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "otherItem", "anotherItemWithFirstItemInItsIdentifier" ],
				identifiersInNewStack: [ "anotherItemWithFirstItemInItsIdentifier", "otherItem" ],
			},
			[
				[ "anotherItemWithFirstItemInItsIdentifier" ],
				[ "otherItem" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "item1", "item2" ],
				identifiersInNewStack: [ "item2", "item1" ],
			},
			[
				[ "item2" ],
				[ "item1" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					[ "item1", "item2", "item3" ],
				identifiersInNewStack:
					[
						[ "item1", "item2" ],
						"existing",
					],
			},
			[
				[ "item1", "item2" ],
				[ "item3" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					[
						[ "item1" ],
						[ "item2", "item3" ],
					],
				identifiersInNewStack:
					[ "existing", "item2", "item3" ],
			},
			[
				[ "item1" ], [ "item2" ], [ "item3" ],
			],
		],
	],
)(
	"%j returns %j",
	(argument, existing) =>
		expect(getIdentifierOrItemOrStackLevelOrStack(argument))
		.toEqual(existing),
);

test(
	"Item and existing not specified throws error",
	() =>
		expect(
			() =>
				getIdentifierOrItemOrStackLevelOrStack({
					identifierOrItemOrLevelOrStack: [ "itemNotSpecified" ],
					identifiersInNewStack: [ "itemMissingAndSpecified" ],
				}),
		)
		.toThrowError(
			"Single item level of \"existing\" not specified in new stack \"itemMissingAndSpecified\".",
		),
);