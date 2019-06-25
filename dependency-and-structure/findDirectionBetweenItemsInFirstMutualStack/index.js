/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

/**
  * @typedef Stack
  * @property {Item} [parent]
  *
  * @typedef Item
  * @property {Level} level
  * @property {Stack} [items]
  *
  * @typedef Level
  * @property {Items & Stack} stack
  *
  * @typedef Items
  * @property {function(Level):Number} indexOf
 */

const
	generateAncestors = require("./generateAncestors"),
	getDirectionBetweenItemsWhenMutualStack = require("./getDirectionBetweenItemsWhenMutualStack");

module.exports =
	/**
	 * @param {Object} parameter
	 * @param {Item} parameter.from
	 * @param {Item} parameter.to
	 * @returns {{direction: "above"|"below"|"same"|"self", stack: Stack}}
	 */
	({
		from,
		to,
	}) =>
		getDirectionBetweenItemsWhenMutualStack({
			from,
			to,
		})
		||
		getDirectionBetweenFirstAncestorOrThrowError(
			generateAncestors(
				[
					{
						from,
						to,
					},
				],
			),
		);

function getDirectionBetweenFirstAncestorOrThrowError(
	ancestors,
) {
	for (const ancestor of ancestors) {
		const direction = getDirectionBetweenItemsWhenMutualStack(ancestor);

		if (direction)
			return direction;
	}

	/* istanbul ignore next: error is only thrown when there is gap in the implementation */
	throw Error("Could not find direction between items in first mutual stack.");
}