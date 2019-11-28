// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const stackItemsWhenMultiple = require("../stackItemsWhenMultiple");

module.exports =
	function * createItemsProperty({
		classDeclarationOrExpression,
		createItemsForAndRemoveDeclarationsIn,
	}) {
		const items =
			stackItemsWhenMultiple({
				items:
					createItemsForAndRemoveDeclarationsIn(
						classDeclarationOrExpression,
					),
				withSingleInArray:
					false,
			});

		if (items)
			yield { items };
	};