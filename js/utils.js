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

export const showPage = (elem) => {
	if (elem instanceof HTMLElement) {
		elem.classList.remove("element-hidden");
		elem.classList.remove("hide-right");
	}
};

/**
 * Returns a uuid
 */
export const uuidv4 = () => {
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	);
};
