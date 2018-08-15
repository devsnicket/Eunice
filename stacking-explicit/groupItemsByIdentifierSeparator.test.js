const groupItemsByIdentifierSeparator = require("./groupItemsByIdentifierSeparator");

assertGroupItemsEqualsSource({
	name: "null returns",
	source: null,
});

assertGroupItemsEqualsSource({
	name: "item identifier returns single item identifier",
	source: "item",
});

assertGroupItemsEqualsSource({
	name: "single item identifier returns single item identifier",
	source: [ "item" ],
});

assertGroupItemsEqualsSource({
	name: "single item returns single item",
	source: [ { id: "item" } ],
});

assertGroupItemsEqualsSource({
	name: "single anonymous item returns single anonymous item",
	source: [ {} ],
});

assertGroupItemsEqualsSource({
	name: "two item identifiers returns two item identifiers",
	source: [ "item1", "item2" ],
});

assertGroupItemsEqualsSource({
	name: "second item identifier prefixed with first item identifier returns item identifiers",
	source: [ "item", "itemchildItem" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: [ "item/childItem1", "item/childItem2" ],
			},
		],
	name: "first and second item identifiers with same prefix and separator returns group of prefix",
	source: [ "item/childItem1", "item/childItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: "item/childItem",
			},
		],
	name: "second item identifier prefixed with first item identifier and separator returns group",
	source: [ "item", "item/childItem" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: "item/childItem",
			},
		],
	name: "second item identifier prefixed with first item`s identifier and separator returns group",
	source:
		[
			{ id: "item" },
			"item/childItem",
		],
});

assertGroupItems({
	expected:
		[
			{
				id: "item1",
				items: "item1/childItem",
			},
			"item2",
		],
	name: "second item identifier prefixed with first item identifier and separator and third item identifier returns second grouped by first and third",
	source: [ "item1", "item1/childItem", "item2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: [ "item/childItem1", "item/childItem2" ],
			},
		],
	name: "second and third item identifiers prefixed with first item identifier and separator returns second and third grouped by first",
	source: [ "item", "item/childItem1", "item/childItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: { id: "item/childItem", items: "item/childItem/grandchildItem" },
			},
		],
	name: "second item identifier prefixed with first item identifier and separator, and third item identifier prefixed with second item identifier and separator returns second grouped by first and third grouped by second",
	source: [ "item", "item/childItem", "item/childItem/grandchildItem" ],
});

assertGroupItems({
	expected:
		[
			{
				id:
					"item",
				items:
					{
						id: "item/childItem",
						items: { id: "item/childItem/grandchildItem", items: "item/childItem/grandchildItem/greatgrandchildItem" },
					},
			},
		],
	name: "second item identifier prefixed with first item identifier and separator, third item identifier prefixed with second item identifier and separator, and fourth item identifier prefixed with third item identifier and separator returns second grouped by first, third grouped by second and and fourth grouped by third",
	source: [ "item", "item/childItem", "item/childItem/grandchildItem", "item/childItem/grandchildItem/greatgrandchildItem" ],
});

assertGroupItems({
	expected:
		[
			{
				id:
					"item",
				items:
					[
						{ id: "item/childItem1", items: "item/childItem1/grandchildItem" },
						"item/childItem2",
					],
			},
		],
	name: "second item identifier prefixed with first item identifier and separator, third item identifier prefixed with second item identifier and separator, and fourth item identifier prefixed with first item identifier and separator returns grouped item with grouped item and non-grouped item",
	source: [ "item", "item/childItem1", "item/childItem1/grandchildItem", "item/childItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id:
					"item",
				items:
					{
						id:
							"item/childItem",
						items:
							[
								"item/childItem/grandchildItem1",
								{ id: "item/childItem/grandchildItem2", items: "item/childItem/grandchildItem2/greatgrandchildItem" },
							],
					},
			},
		],
	name: "second item identifier prefixed with first item identifier and separator, third and fourth item identifiers prefixed with second item identifier and separator, and fifth item identifier prefixed with fourth item identifier and separator returns grouped item with grouped item with grouped item and non-grouped item",
	source: [ "item", "item/childItem", "item/childItem/grandchildItem1", "item/childItem/grandchildItem2", "item/childItem/grandchildItem2/greatgrandchildItem" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: [ "item/childItem1", "item/childItem2", "item/childItem3" ],
			},
		],
	name: "second to fourth item identifiers prefixed with first item identifier and separator returns second, third and fourth grouped by first",
	source: [ "item", "item/childItem1", "item/childItem2", "item/childItem3" ],
});

assertGroupItems({
	expected:
		[
			{
				id:
					"item",
				items:
					{
						id: "item/childItem",
						items: [ "item/childItem/grandChildItem1", "item/childItem/grandChildItem2" ],
					},
			},
		],
	name: "second item with two child item identifiers prefixed with second item`s identifier and separator returns second grouped by first",
	source:
		[
			"item",
			{
				id: "item/childItem",
				items: [ "item/childItem/grandChildItem1", "item/childItem/grandChildItem2" ],
			},
		],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: [ "childItem1", "item/childItem2" ],
			},
		],
	name: "first item with child item and second item identifier prefixed with first item`s identifier and separator returns first with child items of child item and second",
	source: [ { id: "item", items: "childItem1" }, "item/childItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: [ "childItem1", "childItem2", "item/childItem2" ],
			},
		],
	name: "first item with two child items and second item identifier prefixed with first item`s identifier and separator returns first with child items of child items and second",
	source: [ { id: "item", items: [ "childItem1", "childItem2" ] }, "item/childItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items:
					[
						{
							id: "item/childItem1",
							items:
								{
									id: "item/childItem1/grandchildItem",
									items: "item/childItem1/grandchildItem/greatgrandchildItem",
								},
						},
						"item/childItem2",
					],
			},
		],
	name: "second, third and fourth item identifiers prefixed with previous item identifier and separator, and fifth item identifier prefixed with first item identifier returns first with child items of second and fifth, third identifier as child of second and fourth identifier as child of third",
	source: [ "item", "item/childItem1", "item/childItem1/grandchildItem", "item/childItem1/grandchildItem/greatgrandchildItem", "item/childItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items:
					[
						{
							id: "item/childItem1",
							items:
								{
									id: "item/childItem1/grandchildItem",
									items:
										{
											id: "item/childItem1/grandchildItem/greatgrandchildItem",
											items: "item/childItem1/grandchildItem/greatgrandchildItem/greatgreatgrandchildItem",
										},
								},
						},
						"item/childItem2",
					],
			},
		],
	name: "second, third, fourth and fifth item identifiers prefixed with previous item identifier and separator, and sixth item identifier prefixed with first item identifier returns first with child items of second and sixth, third identifier as child of second, fourth identifier as child of third and fifth identifier as child of fourth",
	source: [ "item", "item/childItem1", "item/childItem1/grandchildItem", "item/childItem1/grandchildItem/greatgrandchildItem", "item/childItem1/grandchildItem/greatgrandchildItem/greatgreatgrandchildItem", "item/childItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items: [ "item/childItem1", "item/childItem2" ],
			},
		],
	name: "two item identifiers prefixed with same element and separators returns item with element identifier and two the items as children",
	source: [ "item/childItem1", "item/childItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items:
					[
						{
							id: "item/childItem1",
							items: "item/childItem1/grandchildItem",
						},
						"item/childItem2",
					],
			},
		],
	name: "second item identifier prefixed with same two elements as first item identifiers and separator, and third item prefixed with the same element as first item identifier and separator, returns item with element identifier, and one child item with child item and another child item",
	source: [ "item/childItem1", "item/childItem1/grandchildItem", "item/childItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item/childItem",
				items: [ "item/childItem/grandchildItem1", "item/childItem/grandchildItem2" ],
			},
		],
	name: "two item identifiers prefixed with same two elements and separators returns item with the two element identifiers and two the items as children",
	source: [ "item/childItem/grandchildItem1", "item/childItem/grandchildItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item/childItem1",
				items: [ "item/childItem1/grandchildItem1", "item/childItem1/grandchildItem2" ],
			},
		],
	name: "second and third item identifiers prefixed with two elements of first item identifier and separator returns item with two elements of first item identifier, and the second and third items as children",
	source: [ "item/childItem1", "item/childItem1/grandchildItem1", "item/childItem1/grandchildItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items:
					{
						id: "item/childItem",
						items:
							{
								id: "item/childItem/grandchildItem",
								items: [ "item/childItem/grandchildItem/greatgrandchildItem1", "item/childItem/grandchildItem/greatgrandchildItem2" ],
							},
					},
			},
		],
	name: "second item identifier prefixed with first item identifer and separator, third and fourth items prefixed with second item identifier separator, another element and separator returns first item with second item as child and child item of another element with third and fourth items as children",
	source: [ "item", "item/childItem", "item/childItem/grandchildItem/greatgrandchildItem1", "item/childItem/grandchildItem/greatgrandchildItem2" ],
});

assertGroupItems({
	expected:
		[
			{
				id: "item",
				items:
					[
						{
							id: "item/childItem1",
							items:
								{
									id: "item/childItem1/grandchildItem",
									items: "item/childItem1/grandchildItem/greatgrandchildItem",
								},
						},
						"item/childItem2",
					],
			},
		],
	name: "second item identifier prefixed with first item identifer and separator, third item identifier prefixed with second item identifier and separator and fourth item",
	source: [ "item/childItem1", "item/childItem1/grandchildItem", "item/childItem1/grandchildItem/greatgrandchildItem", "item/childItem2" ],
});

function assertGroupItemsEqualsSource({
	name,
	source,
}) {
	assertGroupItems({
		expected: source,
		name,
		source,
	});
}

function assertGroupItems({
	expected,
	name,
	source,
}) {
	test(
		name,
		() =>
			expect(
				groupItemsByIdentifierSeparator({
					identifierSeparator: "/",
					items: source,
				})
			)
			.toEqual(expected)
	);
}