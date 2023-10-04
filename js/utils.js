/**
 * Method to display an error message on an element
 * @param { Object } element
 * @param { String } text
 */
export const displayError = (element, text) => {
	if (element instanceof HTMLElement) {
		element.textContent = text;
	}
};

/**
 * Method to hide the first element (with a transition, opacity effect)
 * and show the second element (also with a transition, opacity effect)
 * @param { HTMLElement } fromElement
 * @param { HTMLElement } toElement
 */
export const mobileTransitions = (fromElement, toElement) => {
	// if both parameters are HTMLElements, fade fromElement out, fade toElement in
	if (fromElement instanceof HTMLElement && toElement instanceof HTMLElement) {
		fromElement.classList.add("element-hidden");
		fromElement.ontransitionend = () => {
			toElement.classList.remove("element-hidden");
		};
	}
};
