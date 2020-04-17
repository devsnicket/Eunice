// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import path from "path";

export default ({
	directory = null,
	names,
	prefix = "",
	scope,
}) =>
	names
	&&
	names.map(
		name => (
			{
				directory:
					path.join(
						...directory ? [ directory ] : [],
						"node_modules",
						scope ? `@${scope}` : "",
						`${prefix}${name}`,
					),
				rootItemIdentifier:
					name,
			}
		),
	);