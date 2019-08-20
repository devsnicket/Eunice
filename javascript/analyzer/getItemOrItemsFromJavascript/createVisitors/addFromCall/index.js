/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	addArgumentsToNestedCallMap = require("./addArgumentsToNestedCallMap"),
	getIdentifierNameFromAndAddOrUpdateReferenceOfParent = require("./getIdentifierNameFromAndAddOrUpdateReferenceOfParent"),
	getNameFromCallee = require("./getNameFromCallee"),
	getPropertyName = require("../getPropertyName"),
	isCalleeIgnoredDefault = require("./isCalleeIgnoredDefault");

module.exports =
	({
		addDependsUponIdentifierToParent,
		addUndeclaredReference,
		callExpression,
		findDeclarationAndParent,
		findParentFunctions,
		isCalleeIgnored = isCalleeIgnoredDefault,
		isVariableInBlockScoped,
	}) => {
		const calleeName = getNameFromCallee(callExpression.callee);

		if (calleeName)
			addFromParentFunctions(
				findParentFunctions(),
			);

		function addFromParentFunctions(
			parentFunctions,
		) {
			addDependsUponIdentifier(
				getIdentifierNameFromAndAddOrUpdateReference(
					calleeName,
				),
			);

			addArgumentsToNestedCallMap({
				addDependsUponIdentifier,
				callExpression,
				getIdentifierNameFromAndAddOrUpdateReference,
			});

			function getIdentifierNameFromAndAddOrUpdateReference(
				reference,
			) {
				return (
					!isCalleeIgnored(reference)
					&&
					getIdentifierNameFromAndAddOrUpdateReferenceOfParent({
						addUndeclaredReference,
						findDeclarationAndParent,
						parentFunctions,
						reference,
					})
				);
			}

			function addDependsUponIdentifier(
				identifier,
			) {
				if (isIdentifierRelevant())
					addDependsUponIdentifierToParent({
						identifier,
						parent: getParent(),
					});

				function isIdentifierRelevant() {
					return (
						identifier
						&&
						!isVariableInBlockScoped(identifier)
						&&
						!isParameterOfAnyParentFunction(identifier)
					);
				}

				function getParent() {
					return whenBlockOrIdentifiable() || null;

					function whenBlockOrIdentifiable() {
						return (
							parentFunctions
							&&
							parentFunctions.blockOrIdentifiable
						);
					}
				}
			}

			function isParameterOfAnyParentFunction(
				name,
			) {
				return (
					parentFunctions
					&&
					(ofBlockOrIdentifiable() || ofAnonymous())
				);

				function ofBlockOrIdentifiable() {
					return (
						parentFunctions.blockOrIdentifiable
						&&
						isParameterOfParentFunction(parentFunctions.blockOrIdentifiable)
					);
				}

				function ofAnonymous() {
					return (
						parentFunctions.anonymous
						&&
						parentFunctions.anonymous.some(isParameterOfParentFunction)
					);
				}

				function isParameterOfParentFunction(
					parentFunction,
				) {
					return (
						parentFunction.params.some(isParameter)
					);
				}

				function isParameter(
					parameter,
				) {
					return (
						whenArray()
						||
						whenAssignment()
						||
						whenObject()
						||
						whenRest()
						||
						parameter.name === name
					);

					function whenArray() {
						return (
							parameter.type === "ArrayPattern"
							&&
							parameter.elements.some(element => element.name === name)
						);
					}

					function whenAssignment() {
						return (
							parameter.type === "AssignmentPattern"
							&&
							isParameter(parameter.left)
						);
					}

					function whenObject() {
						return (
							parameter.type === "ObjectPattern"
							&&
							parameter.properties.some(property => getPropertyName(property) === name)
						);
					}

					function whenRest() {
						return (
							parameter.type === "RestElement"
							&&
							parameter.argument.name === name
						);
					}
				}
			}
		}
	};