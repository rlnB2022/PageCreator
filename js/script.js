/**
 * Add temporary data to localStorage - for Development Only
 */
const projects = {
	projects: [
		{ name: "Project 1", layout: [] },
		{ name: "Project 2", layout: [] },
		{ name: "Project 3", layout: [] },
	],
};

localStorage.setItem("createdProjects", JSON.stringify(projects));

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
};

const localProjects = addProjectsToList(getLocalProjects());
