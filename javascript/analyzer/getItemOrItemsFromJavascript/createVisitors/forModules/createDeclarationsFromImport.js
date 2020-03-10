// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	createPathBasedDependsUpon,
	path,
	specifiers,
}) => {
	return specifiers.map(createFromSpecifier);

	function createFromSpecifier({
		local,
		imported,
	}) {
		return (
			{
				dependsUpon: createDependsUpon(),
				id: local.name,
				type: "import",
			}
		);

		function createDependsUpon() {
			return (
				createPathBasedDependsUpon({
					items: imported && imported.name,
					path,
				})
			);
		}
	}
};