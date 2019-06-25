/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	{ callOrCreateElementOnError, createFillWithTitleElement } = require("@devsnicket/eunice-test-harnesses"),
	{ createElement } = require("react"),
	getYamlFromJavaScript = require("../getYamlFromJavaScript");

module.exports =
	yaml =>
		createFillWithTitleElement({
			content:
				callOrCreateElementOnError({
					action:
						() =>
							createElement(
								"pre",
								{
									style:
										{
											flex: 1,
											overflow: "auto",
										},
								},
								createElement(
									"code",
									{ id: "yaml" },
									getYamlFromJavaScript(yaml),
								),
							),
					createElement,
				}),
			title:
				"YAML",
		});