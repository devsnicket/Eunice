// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createDeclarationsFromExport = require("./createDeclarationsFromExport"),
	createDeclarationsFromImport = require("./createDeclarationsFromImport"),
	{ findBlockOrIdentifiableParent } = require("../parentFunctionsFromAncestors"),
	removeJsFilePathExtension = require("../removeJsFilePathExtension");

module.exports =
	addDeclarationsIn => {
		return (
			{
				ExportAllDeclaration:
					visitExportAllDeclaration,
				ExportNamedDeclaration:
					visitExportNamedDeclaration,
				ImportDeclaration:
					visitImportDeclaration,
			}
		);

		function visitExportAllDeclaration(
			{ source: { value } },
			ancestors,
		) {
			addDeclarationsIn({
				declarations:
					[ {
						dependsUpon:
							removeJsFilePathExtension(value),
						type:
							"export",
					} ],
				parent:
					findBlockOrIdentifiableParent(ancestors),
			});
		}

		function visitExportNamedDeclaration(
			{ source, specifiers },
			ancestors,
		) {
			addDeclarationsIn({
				declarations:
					createDeclarationsFromExport({
						source,
						specifiers,
					}),
				parent:
					findBlockOrIdentifiableParent(
						ancestors,
					),
			});
		}

		function visitImportDeclaration(
			{ source, specifiers },
			ancestors,
		) {
			addDeclarationsIn({
				declarations:
					createDeclarationsFromImport({
						from:
							removeJsFilePathExtension(
								source.value,
							),
						specifiers,
					}),
				parent:
					findBlockOrIdentifiableParent(
						ancestors,
					),
			});
		}
	};