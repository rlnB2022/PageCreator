import { displayError, showPage, uuidv4 } from "./utils.js";

const dialogElem = document.getElementById("dialog-create-new-project");
const createProjectButton = document.getElementById("btn-create-new-project");
const errorElem = document.querySelector(".project-name--error");
const btnCreateNewProject = document.getElementById("create-new-project");
const btnCancelCreateNewProject = document.getElementById(
	"btn-cancel-create-new-project"
);
const btnCreate = document.getElementById("btn-cancel-create-new-project");
const btnCloseButton = document.querySelector(".close-button");

btnCloseButton.addEventListener("click", () => {
	toggleCreateNewProjectDialog();
});

btnCreateNewProject.addEventListener("click", () => {
	toggleCreateNewProjectDialog();
});

btnCancelCreateNewProject.addEventListener("click", () => {
	toggleCreateNewProjectDialog();
});

const toggleCreateNewProjectDialog = () => {
	dialogElem.addEventListener("transitionend", () => {
		const inputElem = document.querySelector(".input-project-name");
		if (dialogElem.classList.contains("active")) {
			inputElem.focus();
		}
		inputElem.value = "";
		errorElem.textContent = "";
	});

	dialogElem.classList.toggle("active");
};

/**
 * Create the project!
 */
createProjectButton.addEventListener("click", () => {
	const inputElem = document.querySelector(".input-project-name");
	const includeNav = document.getElementById("include-nav");

	/* If a name is entered, check to make sure it doesn't conflict with any
	   other name in localStorage */
	if (inputElem.value.length > 0) {
		const nameExists = checkDuplicateProjectName(inputElem.value);
		if (!nameExists) {
			// get all projects
			let existingProjects = getLocalProjects();
			// create the uuid
			let id = uuidv4();
			/* if the user wants a navigation header automatically included
			   create the header array to add to the object
			   should include an image (logo)
			   an h1 tag and a ul with typical menu settings:
			   Home, About, Contact, etc.
			*/
			const nav = includeNav.checked
				? {
						header: {
							attr: [
								{
									class: "test-class",
								},
							],
							children: [
								{
									type: "img",
									attr: [
										{ src: "https://placehold.co/400x400" },
										{ width: 400 },
										{ height: 400 },
									],
								},
								{
									type: "h1",
									attr: [
										{
											styles: {
												"font-size": "1rem",
												color: "#fff",
											},
										},
									],
									text: inputElem.value,
								},
								// {
								// 	type: "ul",
								// 	attr: [
								// 		{
								// 			styles: {
								// 				"list-style-type": "none",
								// 				display: "flex",
								// 			},
								// 		},
								// 	],
								// 	children: [
								// 		{
								// 			type: "li",
								// 			id: "nav-home",
								// 			label: "Home",
								// 			attr: [
								// 				{
								// 					styles: {
								// 						"text-decoration": "none",
								// 						"font-size": "1rem",
								// 					},
								// 				},
								// 			],
								// 		},
								// 		{
								// 			id: "nav-about",
								// 			label: "About",
								// 			attr: [
								// 				{
								// 					styles: {
								// 						"text-decoration": "none",
								// 						"font-size": "1rem",
								// 					},
								// 				},
								// 			],
								// 		},
								// 		{
								// 			id: "nav-contact",
								// 			label: "Contact",
								// 			attr: [
								// 				{
								// 					styles: {
								// 						"text-decoration": "none",
								// 						"font-size": "1rem",
								// 					},
								// 				},
								// 			],
								// 		},
								// 	],
								// },
							],
						},
				  }
				: {};
			// if navigation checkbox is checked, add navigation to object
			if (existingProjects) {
				// add project to localStorage
				existingProjects.projects = [
					...existingProjects.projects,
					{
						id: id,
						name: inputElem.value,
						layout: nav,
					},
				];
			} else {
				existingProjects = {
					projects: [
						{
							id: id,
							name: inputElem.value,
							layout: nav,
						},
					],
				};
			}

			localStorage.setItem("createdProjects", JSON.stringify(existingProjects));

			// Remove all children in list of projects
			const listElem = document.getElementById("list-of-projects");
			listElem.replaceChildren();

			// update the Aside element to show all of the projects
			addProjectsToList(getLocalProjects());

			// hide the dialog
			dialogElem.classList.toggle("active");

			// launch page, if option selected
			const launchPage = document.getElementById("launch-page").checked;

			if (launchPage) {
				const main = document.getElementById("App");

				// ******** ON MOBILE ONLY! *********
				populatePage(id);
				showPage(main);
			}
		} else {
			// name exists, show error
			displayError(errorElem, "Project Name already exists.");
		}
	}
});

/**
 * Return true if a Project Name already exists
 * @param {String} str Project Name entered by user into input element
 * @returns { Boolean }
 */
const checkDuplicateProjectName = (str) => {
	// get all project names from localStorage
	const values = getLocalProjects();
	let names = "";
	if (values) {
		names = values.projects.map((value) => value.name);
	}

	// check if names parameter matches any of these names
	// return true if there is a match
	return names.includes(str);
};

/**
 * Get all projects from localStorage
 * @returns Array of Projects, already parsed
 */

const getLocalProjects = () => {
	return JSON.parse(localStorage.getItem("createdProjects"));
};

/**
 * Add Projects to the List!
 * @param {Array} localProjects
 */
const addProjectsToList = (localProjects) => {
	const listElem = document.getElementById("list-of-projects");
	if (localProjects) {
		localProjects.projects.map((project) => {
			const projectDiv = document.createElement("div");
			projectDiv.className = "project-link";
			// add id so the correct page will display when the item is clicked on
			// projectDiv.dataset.id = project.id;

			// add eventlistener
			projectDiv.addEventListener("click", () => {
				const main = document.getElementById("App");
				populatePage(project.id);
				showPage(main);
			});

			const innerDiv = document.createElement("div");
			innerDiv.className = "link-project--name";

			const fontAwesomeDiv = document.createElement("i");
			fontAwesomeDiv.className = "fa-regular fa-circle";

			const innerPara = document.createElement("p");
			innerPara.textContent = project.name;

			innerDiv.appendChild(fontAwesomeDiv);
			innerDiv.appendChild(innerPara);

			projectDiv.appendChild(innerDiv);

			const arrowDiv = document.createElement("i");
			arrowDiv.className = "fa-solid fa-chevron-right";

			projectDiv.appendChild(arrowDiv);

			listElem.appendChild(projectDiv);
		});
	}
};

addProjectsToList(getLocalProjects());

/**
 * Populate the page with data from localStorage
 * @param {String} id uuid of project in localStorage
 */
export const populatePage = (id) => {
	// clear the main page
	const mainPage = document.getElementById("App");
	mainPage.replaceChildren();
	// get projects array data from localStorage using id
	const localProjects = getLocalProjects();

	// console.log(localProjects.projects);

	const projectData = localProjects.projects.filter(
		(project) => project.id === id
	);
	// loop through layout array creating the page

	const projectObj = Object.assign({}, ...projectData);

	// loop through projectLayoutKeys to start adding elements to 'main'
	for (const [key, value] of Object.entries(projectObj.layout)) {
		const childElement = createNewElement(key, value, mainPage);
		mainPage.append(childElement);
	}
};

const createNewElement = (type, data, parent) => {
	console.log("parent: ", parent);
	const newElement = document.createElement(type);
	console.log("newElement: ", newElement);
	console.log("DATA: ", data);

	// add any attributes to this element
	if (data.attr) {
		data.attr.forEach((item) => {
			console.log("item: ", item);
			const key = Object.keys(item);
			const value = Object.values(item);
			newElement.setAttribute(key, value);
		});
	}

	// parent.append(newElement);
	if (data.children) {
		data.children.forEach((child) => {
			console.log("child: ", child);
			// console.log("parentElement: ", parentElement);
			createNewElement(
				child.type,
				{
					attr: child.attr,
					children: child.children,
				},
				newElement
			);
		});
	}
	parent.append(newElement);

	return newElement;
};
