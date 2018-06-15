const countInEachDirection = require("./countDependencies/countInEachDirection");

module.exports =
	({
		getStackDirection,
		item,
	}) => (
		{
			dependentsCount:
				countInEachDirection({
					dependencies:
						getFromItemRecursive({
							item,
							selector: getDependents,
						}),
					getStackDirection,
				}),
			dependsUponCount:
				countInEachDirection({
					dependencies:
						getFromItemRecursive({
							item,
							selector: getDependsUpon,
						}),
					getStackDirection,
				}),
		}
	);

function getDependents(
	item
) {
	return item.dependents;
}

function getDependsUpon(
	item
) {
	return item.dependsUpon;
}

function getFromItemRecursive({
	item,
	selector,
}) {
	return (
		item.items
		?
		[
			...selector(item) || [],
			...getFromItemsRecursive(item.items),
		]
		:
		selector(item));

	function getFromItemsRecursive(
		items
	) {
		return (
			items
			.map(
				childItem =>
					getFromItemRecursive({
						item: childItem,
						selector,
					})
			)
			.reduce(
				(selecteds, selected) =>
					selected
					?
					[ ...selecteds, ...selected ]
					:
					selecteds,
				[]
			)
		);
	}
}