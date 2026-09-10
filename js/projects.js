const projects = [
    {
        id: "website",
        name: "Build Your First Website",
        description: "Create a simple responsive website using HTML and CSS.",
        difficulty: "Beginner",
        progress: 0
    },

    {
        id: "calculator",
        name: "Build a Calculator",
        description: "Create a working calculator using HTML, CSS and JavaScript.",
        difficulty: "Beginner",
        progress: 0
    },

    {
        id: "to-do",
        name: "Build a To-Do App",
        description: "Create an interactive to-do list using JavaScript.",
        difficulty: "Beginner",
        progress: 0
    }
];


const projectList = document.querySelector("#project-list");
projects.forEach(function (project) {

    projectList.innerHTML += `
        <div class="project-card">

            <h3>${project.name}</h3>

            <p>${project.description}</p>

            <span>${project.difficulty}</span>

            <p>Progress: ${project.progress}%</p>

            <a href="project.html?id=${project.id}">
    <button>View Project</button>
</a>
        </div>
    `;

});
