const
	countDependenciesOfItemRecursive = require("./createElementsContainer/countDependenciesOfItemRecursive"),
	createDependenciesInlineElements = require("./createElementsContainer/createDependenciesInlineElements"),
	createDependenciesInlineGroupFactories = require("./createElementsContainer/createDependenciesInlineGroupFactories"),
	createDependencyGroupFactoryWhenRequired = require("./createElementsContainer/createDependencyGroupFactoryWhenRequired"),
	createItemAndDependencyGroupsContainer = require("./createElementsContainer/createItemAndDependencyGroupsContainer"),
	createItemDependencyGroupsAndCalculateSize = require("./createElementsContainer/createItemDependencyGroupsAndCalculateSize"),
	createItemGroupFactory = require("./createElementsContainer/createItemGroupFactory"),
	createStackElementsContainer = require("./createElementsContainer/createStackElementsContainer"),
	createSummaryElementsContainer = require("./createElementsContainer/createSummaryElementsContainer"),
	getDependencyCountInBothDirections = require("./createElementsContainer/getDependencyCountInBothDirections");

module.exports =
	({
		arrows,
		createElement,
		font,
		stack,
		withPrecision,
	}) => {
		const dependencyCounts = [];

		return (
			createSummaryElementsContainer({
				arrows,
				createInlineDependencyElements:
					({
						center,
						count,
						top,
					}) =>
						createDependenciesInlineElements({
							center,
							groupFactories:
								createDependenciesInlineGroupFactoriesForCount(
									count
								),
							top,
						}),
				dependencyCounts,
				stackElementsContainer:
					createStackElementsContainer({
						addPadding,
						createItemGroupsContainer:
							({
								items,
								top,
							}) =>
								createItemAndDependencyGroupsContainer({
									addPadding,
									createItemAndDependencyGroup:
										({
											item,
											left,
										}) =>
											countDependenciesOfAndCreateGroupsForItem({
												item,
												left,
												top,
											}),
									items,
									top,
									withPrecision,
								}),
						stack,
					}),
			})
		);

		function countDependenciesOfAndCreateGroupsForItem({
			item,
			left,
			top,
		}) {
			const dependencyCount = countDependenciesOfItemRecursive(item);

			if (dependencyCount)
				dependencyCounts.push(dependencyCount);

			return (
				createItemDependencyGroupsAndCalculateSize({
					createGroupFactoryWhenRequired:
						({ arrow, count }) =>
							createDependencyGroupFactoryWhenRequired({
								arrow,
								count,
								createTextGroup,
								font,
							}),
					dependencyCount:
						getDependencyCountInBothDirections({
							arrows,
							dependencyCount,
						}),
					itemGroupFactory:
						createItemGroupFactory({
							createTextGroup,
							dependencyGroupFactories:
								dependencyCount
								&&
								dependencyCount.dependsUpon
								&&
								dependencyCount.dependsUpon.inner
								&&
								createDependenciesInlineGroupFactoriesForCount(dependencyCount.dependsUpon.inner),
							font,
							identifier: item.id,
						}),
					left,
					top,
					withPrecision,
				})
			);
		}

		function createDependenciesInlineGroupFactoriesForCount(
			countWithDirection
		) {
			return (
				createDependenciesInlineGroupFactories({
					arrows,
					countWithDirection,
					createDependencyGroupFactoryWhenRequired:
						({ arrow, count }) =>
							createDependencyGroupFactoryWhenRequired({
								arrow,
								count,
								createTextGroup,
								font,
							}),
				})
			);
		}

		// x and y are attribute names in SVG
		/* eslint id-length: ["error", { "exceptions": ["x", "y"] }] */
		function createTextGroup({
			attributes,
			className,
			elementName,
			elementsBelowText,
			height,
			left,
			paddingBottom = 0,
			paddingRight,
			text,
			top,
			width,
		}) {
			return (
				createElement(
					"g",
					className && { className },
					[
						createElement(
							elementName,
							{
								...attributes,
								height,
								width,
								...left > 0 && { x: left },
								...top > 0 && { y: top },
							}
						),
						createElement(
							"text",
							{
								x: withPrecision(left + getTextLeftOffset()),
								y: withPrecision(top + getTextTopOffset()),
							},
							text
						),
						...elementsBelowText || [],
					]
				)
			);

			function getTextLeftOffset() {
				return (width - paddingRight) / 2;
			}

			function getTextTopOffset() {
				return (
					((height - paddingBottom) / 2)
					+
					(font.size * 0.375)
				);
			}
		}

		function addPadding(
			offset
		) {
			return (
				offset == 0
				?
				0
				:
				withPrecision(offset + 15)
			);
		}
	};