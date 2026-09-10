const params = new URLSearchParams(window.location.search);

const projectId = params.get("id");

const project = projects.find(function (project) {
    return project.id === projectId;
});

document.querySelector("#project-name").textContent = project.name;
document.querySelector("#project-description").textContent = project.description;
document.querySelector("#project-difficulty").textContent = project.difficulty;
document.querySelector("#project-progress").textContent = project.progress + "%";
