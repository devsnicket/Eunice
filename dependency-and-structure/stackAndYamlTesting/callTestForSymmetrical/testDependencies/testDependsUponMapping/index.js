// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	testDependencyPermeable = require("./testDependencyPermeable"),
	testDependsUponMissingChildInMissingParent = require("./testDependsUponMissingChildInMissingParent"),
	testDependsUponMissingGrandchildInMissingChildInMissingParent = require("./testDependsUponMissingGrandchildInMissingChildInMissingParent"),
	testDependsUponMissingGreatGrandchildInMssingGrandchildInMissingChildInMissingParent = require("./testDependsUponMissingGreatGrandchildInMissingGrandchildInMissingChildInMissingParent"),
	testDependsUponTwoMissingChildrenInMissingParent = require("./testDependsUponTwoMissingChildrenInMissingParent"),
	testFirstDependsUponChildAndMissingChildInSecond = require("./testFirstDependsUponChildAndMissingChildInSecond"),
	testFirstDependsUponChildInSecond = require("./testFirstDependsUponChildInSecond"),
	testFirstDependsUponChildInSecondAndSecond = require("./testFirstDependsUponChildInSecondAndSecond"),
	testFirstDependsUponGrandchildInSecond = require("./testFirstDependsUponGrandchildInSecond"),
	testFirstDependsUponGrandchildInSecondAndChildInSecond = require("./testFirstDependsUponGrandchildInSecondAndChildInSecond"),
	testFirstDependsUponMissingChildInSecond = require("./testFirstDependsUponMissingChildInSecond"),
	testFirstDependsUponMissingChildInSecondAndSecond = require("./testFirstDependsUponMissingChildInSecondAndSecond"),
	testFirstDependsUponMissingGrandchildInMissingChildInSecond = require("./testFirstDependsUponMissingGrandchildInMissingChildInSecond"),
	testFirstDependsUponMissingGrandchildInSecond = require("./testFirstDependsUponMissingGrandchildInSecond"),
	testFirstDependsUponMissingGreatGrandchildInMissingGrandchildInMissingChildInSecond = require("./testFirstDependsUponMissingGreatGrandchildInMissingGrandchildInMissingChildInSecond"),
	testFirstDependsUponTwoChildrenInSecond = require("./testFirstDependsUponTwoChildrenInSecond"),
	testFirstDependsUponTwoChildrenInSecondAndSecond = require("./testFirstDependsUponTwoChildrenInSecondAndSecond"),
	testFirstDependsUponTwoGrandchildrenInChildInSecond = require("./testFirstDependsUponTwoGrandchildrenInChildInSecond"),
	testFirstDependsUponTwoGrandchildrenInTwoChildrenInSecond = require("./testFirstDependsUponTwoGrandchildrenInTwoChildrenInSecond"),
	testFirstDependsUponTwoMissingGrandchildrenInTwoChildrenInSecond = require("./testFirstDependsUponTwoMissingGrandchildrenInTwoChildrenInSecond"),
	testFirstDependsUponTwoMissingGrandchildrenInTwoMissingChildInSecond = require("./testFirstDependsUponTwoMissingGrandchildrenInTwoMissingChildInSecond");

module.exports =
	/** @type {import("../../Parameter.d")} */
	stackAndYamlTest =>
		describe(
			"depends upon mapping",
			() => {
				testDependencyPermeable(stackAndYamlTest);
				testDependsUponMissingChildInMissingParent(stackAndYamlTest);
				testDependsUponMissingGrandchildInMissingChildInMissingParent(stackAndYamlTest);
				testDependsUponMissingGreatGrandchildInMssingGrandchildInMissingChildInMissingParent(stackAndYamlTest);
				testDependsUponTwoMissingChildrenInMissingParent(stackAndYamlTest);
				testFirstDependsUponChildAndMissingChildInSecond(stackAndYamlTest);
				testFirstDependsUponChildInSecond(stackAndYamlTest);
				testFirstDependsUponChildInSecondAndSecond(stackAndYamlTest);
				testFirstDependsUponGrandchildInSecond(stackAndYamlTest);
				testFirstDependsUponGrandchildInSecondAndChildInSecond(stackAndYamlTest);
				testFirstDependsUponMissingChildInSecond(stackAndYamlTest);
				testFirstDependsUponMissingChildInSecondAndSecond(stackAndYamlTest);
				testFirstDependsUponMissingGrandchildInMissingChildInSecond(stackAndYamlTest);
				testFirstDependsUponMissingGrandchildInSecond(stackAndYamlTest);
				testFirstDependsUponMissingGreatGrandchildInMissingGrandchildInMissingChildInSecond(stackAndYamlTest);
				testFirstDependsUponTwoChildrenInSecond(stackAndYamlTest);
				testFirstDependsUponTwoChildrenInSecondAndSecond(stackAndYamlTest);
				testFirstDependsUponTwoGrandchildrenInChildInSecond(stackAndYamlTest);
				testFirstDependsUponTwoGrandchildrenInTwoChildrenInSecond(stackAndYamlTest);
				testFirstDependsUponTwoMissingGrandchildrenInTwoChildrenInSecond(stackAndYamlTest);
				testFirstDependsUponTwoMissingGrandchildrenInTwoMissingChildInSecond(stackAndYamlTest);
			},
		);