// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import assertGetSvgForYaml from "../assertGetSvgForYaml";
import createForDependencyCount from "./createForDependencyCount";
import path from "path";

test(
	"dependency count elements can be created in a container",
	() =>
		assertGetSvgForYaml({
			elementContainerFactory:
				{ createForDependencyCount },
			expectedSvgDirectoryPath:
				__dirname,
			yamlDirectory:
				path.join("item", "with-dependencies", "outer", "above-and-below-and-same"),
		}),
);