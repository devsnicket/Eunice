const
	countDependenciesOfItemRecursive = require("./createStackWithSummaryGroupFactory/countDependenciesOfItemRecursive"),
	createDependenciesInlineGroupFactories = require("./createStackWithSummaryGroupFactory/createDependenciesInlineGroupFactories"),
	createDependencyGroupFactoryWhenRequired = require("./createStackWithSummaryGroupFactory/createDependencyGroupFactoryWhenRequired"),
	createGroupsCenteredHorizontally = require("./createStackWithSummaryGroupFactory/createGroupsCenteredHorizontally"),
	createItemGroupFactory = require("./createStackWithSummaryGroupFactory/createItemGroupFactory"),
	createOuterDependencyGroupFactory = require("./createStackWithSummaryGroupFactory/createOuterDependencyGroupFactory"),
	createSummaryGroupFactory = require("./createStackWithSummaryGroupFactory/createSummaryGroupFactory");

module.exports =
	({
		aggregateGroupFactoriesWithOrientation,
		arrows,
		createItemGroupWrapperForItem,
		createTextGroup,
		font,
		getDependencyCountInBothDirections,
		stack,
		sumDependencyCount,
	}) => {
		const
			dependencyCounts = [],
			dependencySpacing = 4;

		return (
			createSummaryGroupFactory({
				arrows,
				createInlineDependencyGroups:
					({
						center,
						count,
						top,
					}) =>
						createGroupsCenteredHorizontally({
							center,
							groupFactories:
								createDependenciesInlineGroupFactoriesForCount({
									countWithDirection: count,
									keyPrefix: "",
								}),
							spacing:
								dependencySpacing,
							top,
						}),
				dependencyCounts,
				stackGroupFactory:
					aggregateGroupFactoriesWithOrientation.vertical({
						groupFactories:
							stack
							.map(
								level =>
									aggregateGroupFactoriesWithOrientation.horizontal({
										groupFactories:
											level.map(countDependenciesOfAndCreateGroupFactoryForItem),
										spacing:
											15,
									})
							),
						spacing:
							15,
					}),
			})
		);

		function countDependenciesOfAndCreateGroupFactoryForItem(
			item
		) {
			const dependencyCount =
				countDependenciesOfItemRecursive({
					item,
					parentStack: stack,
					sumCount: sumDependencyCount,
				});

			if (dependencyCount)
				dependencyCounts.push(dependencyCount);

			return (
				createOuterDependencyGroupFactory({
					aggregateGroupFactoriesWithOrientation,
					createGroupFactoryWhenRequired:
						({ arrow, count, keySuffix }) =>
							createDependencyGroupFactoryWhenRequired({
								arrow,
								count,
								createTextGroup,
								font,
								key: `${item.id} dependency count outer ${keySuffix}`,
							}),
					dependencyCount:
						getDependencyCountInBothDirections({
							arrows,
							dependencyCount,
						}),
					itemGroupFactory:
						createItemGroupFactoryWithDependsUponCounts(),
				})
			);

			function createItemGroupFactoryWithDependsUponCounts() {
				return (
					createItemGroupFactory({
						createItemGroupWrapper:
							itemGroup =>
								createItemGroupWrapperForItem({
									item,
									itemGroup,
								}),
						createTextGroup,
						dependencyGroupFactories:
							dependencyCount
							&&
							dependencyCount.dependsUpon
							&&
							dependencyCount.dependsUpon.inner
							&&
							createDependenciesInlineGroupFactoriesForCount({
								countWithDirection: dependencyCount.dependsUpon.inner,
								keyPrefix: `${item.id} `,
							}),
						dependencySpacing,
						font,
						identifier:
							item.id,
					})
				);
			}
		}

		function createDependenciesInlineGroupFactoriesForCount({
			countWithDirection,
			keyPrefix,
		}) {
			return (
				createDependenciesInlineGroupFactories({
					arrows,
					countWithDirection,
					createDependencyGroupFactoryWhenRequired:
						({ arrow, count, keySuffix }) =>
							createDependencyGroupFactoryWhenRequired({
								arrow,
								count,
								createTextGroup,
								font,
								key: `${keyPrefix}dependency count inner ${keySuffix}`,
							}),
				})
			);
		}
	};