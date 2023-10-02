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

/* ************************************************************************* */
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
			// if navigation checkbox is checked, add navigation to object
			if (existingProjects) {
				const nav = includeNav.checked
					? {
							header: [
								{
									type: "img",
									src: "https://placehold.co/400x400",
									width: 400,
									height: 400,
								},
								{
									type: "h1",
									fontSize: "default",
									color: "#fff",
									text: inputElem.value,
								},
							],
					  }
					: [];
				// add project to localStorage
				existingProjects.projects = [
					...existingProjects.projects,
					{
						name: inputElem.value,
						layout: [nav],
					},
				];
			} else {
				existingProjects = {
					projects: [
						{
							name: inputElem.value,
							layout: [],
						},
					],
				};
			}

			localStorage.setItem("createdProjects", JSON.stringify(existingProjects));

			// Remove all children in list of projects
			const listElem = document.getElementById("list-of-projects");
			while (listElem.firstChild) {
				listElem.removeChild(listElem.firstChild);
			}
			// update the Aside to show all of the projects
			const localProjects = addProjectsToList(getLocalProjects());

			// hide the dialog
			dialogElem.classList.toggle("active");
		} else {
			// name exists, show error
			errorElem.textContent = "Project Name already exists.";
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
 * Add temporary data to localStorage - for Development Only
 */
// const projects = {
// 	projects: [
// 		{ name: "Project 1", layout: [] },
// 		{ name: "Project 2", layout: [] },
// 		{ name: "Project 3", layout: [] },
// 	],
// };

// localStorage.setItem("createdProjects", JSON.stringify(projects));

/**
 * Get all projects from localStorage
 * @returns Array of Projects
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

const localProjects = addProjectsToList(getLocalProjects());
