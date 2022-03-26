export function createElement(tagName, className, parent, text, options) {
	// Create our element
	let element = document.createElement(tagName);

	// Add our class name
	if (className) {
		element.className = className;
	}

	// Add our parent
	if (parent) {
		parent.appendChild(element);
	}

	// Add our text
	if (text) {
		element.textContent = text;
	}

	// Add our options
	if (options) {
		const attributes = Object.entries(options);
		for (const [key, value] of attributes) {
			element[key] = value;
		}
	}
	return element;
}
