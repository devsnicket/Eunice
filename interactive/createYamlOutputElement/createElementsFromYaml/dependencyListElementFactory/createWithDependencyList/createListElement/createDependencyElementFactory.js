module.exports =
	({
		createAncestorSeparatorElement,
		createIdentifierHierarchyAnchor,
	}) => {
		return (
			{
				createElements:
					dependency =>
						createForItem(dependency)
						.elements,
			}
		);

		function createForItem(
			item,
		) {
			return (
				createForItemWithAncestors(
					createForAncestors(),
				)
			);

			function createForAncestors() {
				return (
					createForAncestorsWhenHasParent(item)
					||
					{
						elements: [],
						identifierHierarchy: [],
					}
				);
			}

			function createForItemWithAncestors({
				elements,
				identifierHierarchy,
			}) {
				return (
					{
						elements:
							[
								...elements,
								createIdentifierHierarchyAnchor(
									[
										...identifierHierarchy,
										item.id,
									],
								),
							],
						identifierHierarchy,
					}
				);
			}
		}

		function createForAncestorsWhenHasParent(
			{ level: { stack: { parent } } },
		) {
			return (
				parent
				&&
				createAsAncestor()
			);

			function createAsAncestor() {
				const
					{
						elements,
						identifierHierarchy,
					} = createForItem(parent);

				return (
					{
						elements:
							[
								...elements,
								createAncestorSeparatorElement(),
							],
						identifierHierarchy:
							[
								...identifierHierarchy,
								parent.id,
							],
					}
				);
			}
		}
	};