module.exports =
	({
		createVariablesFromIdentifier,
		initialization,
	}) => {
		return (
			createFromWhenRequire({
				dependsUponItemIdentifier: null,
				expression: initialization,
			})
			||
			createWhenMember()
		);

		function createWhenMember() {
			return (
				initialization.type === "MemberExpression"
				&&
				createFromWhenRequire({
					dependsUponItemIdentifier: initialization.property.name,
					expression: initialization.object,
				})
			);
		}

		function createFromWhenRequire({
			dependsUponItemIdentifier,
			expression,
		}) {
			return (
				isRequire()
				&&
				create()
			);

			function isRequire() {
				return (
					expression.type === "CallExpression"
					&&
					expression.callee.name === "require"
				);
			}

			function create() {
				const
					argument = getArgument(),
					variables = createVariablesFromIdentifier();

				return (
					variables
					.map(
						variable => (
							{
								...variable,
								dependsUpon:
									getOrCreateDependsUpon({
										identifier: argument,
										items: getOrCreateDependsUponForVariable(variable),
									}),
							}
						),
					)
				);

				function getArgument() {
					return expression.arguments[0].value;
				}
			}

			function getOrCreateDependsUponForVariable(
				variable,
			) {
				return (
					dependsUponItemIdentifier
					?
					getOrCreateDependsUpon({
						identifier: dependsUponItemIdentifier,
						items: variable.dependsUpon,
					})
					:
					variable.dependsUpon
				);
			}
		}
	};

function getOrCreateDependsUpon({
	identifier,
	items,
}) {
	return (
		items
		?
		{
			id: identifier,
			items,
		}
		:
		identifier
	);
}