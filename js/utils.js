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
