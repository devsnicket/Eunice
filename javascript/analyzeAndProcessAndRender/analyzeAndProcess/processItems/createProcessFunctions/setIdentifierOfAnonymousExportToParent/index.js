// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const { replacement: { replaceIdentifiersAndItems } } = require("@devsnicket/eunice-processors");

module.exports =
	identifierOrItemOrLevelOrStack =>
		replaceIdentifiersAndItems({
			identifierOrItemOrLevelOrStack,
			replace,
		});

function replace({
	ancestors,
	identifierOrItem,
}) {
	return (
		identifierOrItem
		&&
		(whenAnonymousExport() || identifierOrItem)
	);

	function whenAnonymousExport() {
		return (
			identifierOrItem.type === "export"
			&&
			{
				id: getParentIdentifier(),
				...identifierOrItem,
			}
		);
	}

	function getParentIdentifier() {
		return (
			ancestors.length
			&&
			ancestors[ancestors.length - 1].id
		);
	}
}