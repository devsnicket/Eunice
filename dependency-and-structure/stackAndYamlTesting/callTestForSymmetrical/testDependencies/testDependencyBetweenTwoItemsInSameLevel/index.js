// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	testFirstDependsUponSecond = require("./testFirstDependsUponSecond"),
	testSecondDependsUponFirst = require("./testSecondDependsUponFirst");

module.exports =
	/** @type {import("../../Parameter.d")} */
	stackAndYamlTest =>
		describe(
			"dependency in same level",
			() => {
				testFirstDependsUponSecond(stackAndYamlTest);
				testSecondDependsUponFirst(stackAndYamlTest);
			},
		);