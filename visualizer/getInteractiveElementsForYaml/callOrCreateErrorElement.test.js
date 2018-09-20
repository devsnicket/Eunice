const
	callOrCreateErrorElement = require("./callOrCreateErrorElement"),
	{ createElement } = require("react");

const expectedError = "This is a error thrown in test.";

test(
	"exception returns element with error",
	() =>
		expect(
			callOrCreateErrorElement({
				action:
					() => {
						throw Error(expectedError);
					},
				createElement,
			}),
		)
		.toHaveProperty("props.children", expectedError),
);